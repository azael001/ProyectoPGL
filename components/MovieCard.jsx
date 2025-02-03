import { Link } from "expo-router";
import { View, StyleSheet, Text, Image, Animated } from "react-native";
import { Puntuacion } from "./Puntuacion";

export function MovieCard({ Movie }) {
  return (
    <Link href={`/${Movie.id}`} asChild>
        <View style={styles.card} key={Movie.id}>
          <Image style={styles.image} source={{ uri: Movie.posterUrl }}/>
          <Puntuacion puntuacionActual={Movie.rating} puntuacionMaxima={100}/>
          
          <Text className="mb-1" style={styles.title}>{Movie.title}</Text>
          <Text className="mb-1" style={styles.releaseDate}>{Movie.releaseDate}</Text>
          <Text className="mt-2 flex-shrink" style={styles.overview}>{Movie.overview.slice(0, 100)}...</Text>
        </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(107, 114, 128, 0.1)",
    padding: 16,
    borderRadius: 12,
    gap: 16,
    marginBottom: 40,
  },
  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  releaseDate: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  overview: {
    fontSize: 16,
    color: "#eee",
  },
  rating: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
  buttonPressed: {
    opacity: 0.7,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
});
