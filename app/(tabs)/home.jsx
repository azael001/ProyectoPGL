import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { FlatList, View, ActivityIndicator, Platform, StyleSheet, Pressable } from "react-native";
import { getLatestMovies } from "../../api/tmdb";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MovieCard } from "../../components/MovieCard";
import { Logo } from "../../components/Logo";
import { CircleInfoIcon } from "../../components/Icons";

export function Home() {
  const [Movies, setMovies] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLatestMovies().then((Movies) => {
      setMovies(Movies);
    });
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, backgroundColor: 'black' }}>
      <View style={{ marginBottom: 20 }}>
        <Logo />
      </View>

      <Link asChild href="/about">
        <Pressable>
          {({ pressed }) => <CircleInfoIcon style={{ color: pressed ? 'grey' : 'white' }}/>}
        </Pressable>
      </Link>
      
      {Movies.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <View style={Platform.OS === 'web' ? styles.estiloWeb : styles.estiloMovil}>
          {Platform.OS === 'web' ? (
            <View style={{ paddingVertical: 20 }}>
              {Movies.map((Movie, index) => (
                <MovieCard key={Movie.id} Movie={Movie} index={index} />
              ))}
            </View>
          ) : (
            <FlatList
              data={Movies}
              keyExtractor={(Movie) => Movie.id}
              renderItem={({ item, index }) => (
                <MovieCard Movie={item} index={index} />
              )}
            />
          )}
        </View>
      )}
    </View>
  );
}
export default Home

const styles = StyleSheet.create({
  estiloWeb: {
    height: '100vh',
    //activamos el scrolling vertical usando el overflowY (SOLO activo cuando "Platform.OS === 'web'")
    overflowY: 'auto', 
  },
  estiloMovil: {
    flex: 1,
  },
});

