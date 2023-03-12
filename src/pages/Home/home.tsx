import React from "react";
import Navbar from "../../components/navbar/navbar";
import instance from "../../api/apiClient";
import requests from "../../api/constants";
import { useQuery } from "react-query";
import Loading from "../../components/Loading/Loading";
import Hero from "../../components/hero/Hero";
import Row from "../../components/row/Row";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/auth/AuthContext";
const Home: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [Saved, setSaved] = React.useState<any>(null);
  const { authenticated, user } = useAuth();
  const fetchBrandMovies = useQuery(
    "brand_movie",
    () => instance.get(requests.fetchTrending),
    {
      refetchOnWindowFocus: false,
    }
  );
  const BrandMovies = fetchBrandMovies.data?.data?.results;
  React.useEffect(() => {
    if (authenticated) {
      setLoading(true);
      getcollection();
    }
    async function getcollection() {
      let email;
      if (user.email) {
        email = user.email;
      } else {
        email = user.user.email;
      }
      const docRef = doc(db, "users", email);
      getDoc(docRef).then((data) => {
        if (data.data()?.savedShows) {
          setSaved(data.data()?.savedShows);
          setLoading(false);
        }
      });
    }
  }, []);
  return (
    <div>
      <Navbar />
      {fetchBrandMovies.isLoading || loading ? (
        <Loading />
      ) : (
        <div className="">
          <Hero BrandMovies={BrandMovies} />
          <Row
            endPoint={requests.fetchNetflixOriginals}
            heading="Netflix Orignals"
            rowId="1"
            savedShows={Saved}
          />
          <Row
            endPoint={requests.fetchTrending}
            heading="Trending Now"
            rowId="2"
            savedShows={Saved}
          />
          <Row
            endPoint={requests.fetchTopRated}
            heading="Top Rated"
            rowId="3"
            savedShows={Saved}
          />
          <Row
            endPoint={requests.fetchComedyMovies}
            heading="Comedy Movies"
            rowId="4"
            savedShows={Saved}
          />
          <Row
            endPoint={requests.fetchHorrorMovies}
            heading="Horror Movies"
            rowId="5"
            savedShows={Saved}
          />
          <Row
            endPoint={requests.fetchRomanceMovies}
            heading="Romantic Movies"
            rowId="6"
            savedShows={Saved}
          />
          <Row
            endPoint={requests.fetchDocumentaries}
            heading="Documentries"
            rowId="7"
            savedShows={Saved}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
