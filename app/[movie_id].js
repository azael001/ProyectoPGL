import { ActivityIndicator, Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Screen } from "../components/Screen";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../api/tmdb";
import { Puntuacion } from "../components/Puntuacion";

export default function Detail() {
  const { movie_id } = useLocalSearchParams();
  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    if (movie_id) {
      getMovieDetails(movie_id).then(setMovieInfo);
    }
  }, [movie_id]);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffee00" },
          headerTintColor: "black",
          headerLeft: () => {},
          headerTitle: "header title",
          headerRight: () => {},
        }}
      />
      {movieInfo === null ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{ uri: movieInfo.posterUrl }}
            />
            <Text style={styles.title}>
              {movieInfo.title}
            </Text>
            <Text style={styles.releaseDate}>{movieInfo.releaseDate}</Text>
            <Text style={styles.description}>
              {movieInfo.description}
            </Text>
            <Puntuacion puntuacionActual={movieInfo.rating} puntuacionMaxima={100}/>

            <View style={styles.reviewsContainer}>
              <Text style={styles.reviewsTitle}>Reviews</Text>
              {movieInfo.reviews.map((review, index) => (
                <View key={index} style={styles.reviewItem}>
                  <Text style={styles.reviewAuthor}>{review.author}</Text>
                  <Text style={styles.reviewQuote}>{review.quote}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 214,
    height: 294,
    marginBottom: 16,
    borderRadius: 4,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
  releaseDate: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 16,
  },
  reviewsContainer: {
    width: '100%',
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  reviewItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  reviewQuote: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 5,
  },
});
