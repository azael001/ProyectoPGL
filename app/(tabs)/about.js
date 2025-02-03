import React from 'react';
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View, StyleSheet } from "react-native";
import { HomeIcon } from "../../components/Icons";
import { Screen } from "../../components/Screen";

export default function About() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Link asChild href="/home">
            <Pressable>
              {({ pressed }) => <HomeIcon style={[styles.homeIcon, pressed && styles.homeIconPressed]} />}
            </Pressable>
          </Link>
          <Text style={styles.title}>Sobre el proyecto</Text>
        </View>

        <Text style={styles.paragraph}>
          Diseñada para cinéfilos y curiosos, nuestra plataforma te permite explorar 
          un catálogo dinámico y actualizado de películas de todos los géneros y épocas. 
          Desde clásicos inolvidables hasta los últimos estrenos, tenemos algo para cada gusto.
        </Text>

        <Text style={styles.paragraph}>
          Nuestro compromiso es conectarte con el mundo del cine, facilitando el 
          descubrimiento de nuevas historias y permitiéndote encontrar tu próxima 
          película favorita con solo unos toques.
        </Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  homeIcon: {
    color: 'white',
    marginRight: 15,
  },
  homeIconPressed: {
    color: 'grey',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    flex: 1,
  },
  paragraph: {
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 24,
  },
});
