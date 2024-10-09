import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNewsData, getNewsData } from "../features/newsApiSlice";
import loadingGif from "../assets/loading.gif";
import defaultImage from "../assets/img.jpeg"; // Varsayılan resim

const News = () => {
  const dispatch = useDispatch();
  const { newsData, error, loading } = useSelector((state) => state.newsApi);

  useEffect(() => {
    dispatch(getNewsData());

    return () => {
      dispatch(clearNewsData());
    };
  }, [dispatch]);

  return (
    <>
      <h1>NEWS</h1>
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <img src={loadingGif} alt="loading" width="200px" height="200px" />
        </Box>
      )}

      {error && <h1>Something went wrong</h1>}
      <Box
        xs={{ d: "flex" }}
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        flexWrap="wrap"
      >
        {newsData?.map((item, index) => (
          <Card sx={{ maxWidth: 345, m: 5, maxHeight: 600 }} key={index}>
            <CardMedia
              component="img"
              height="250"
              image={item?.urlToImage ? item.urlToImage : defaultImage} // Eğer resim yoksa varsayılanı kullan
              alt={item?.title || "defaultImage"}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item?.content}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small" href={item?.url} target="_blank">
                Detail
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default News;
