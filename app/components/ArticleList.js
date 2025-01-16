import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Linking } from "react-native";

const articles = [
  { id: "1", title: "Bahaya Obesitas", image: require("../assets/articles/obesitas.png"), url: "https://puskesmasandalas.padang.go.id/bahaya-obesitas/" },
  { id: "2", title: "6 Bahaya Jika Terlalu Kurus", image: require("../assets/articles/kurus.png"), url: "https://hellodoktor.com/pemakanan/obesiti/risiko-kurang-berat-badan/" },
  { id: "3", title: "Fakta Seputar Obesitas", image: require("../assets/articles/fakta_obesitas.png"), url: "https://hellosehat.com/nutrisi/obesitas/fakta-seputar-obesitas-di-indonesia/" },
  { id: "4", title: "Bahaya Jika Terlalu Kurus", image: require("../assets/articles/bahaya_kurus.png"), url: "https://web.facebook.com/klikdokter/posts/banyak-yang-salah-kaprah-dengan-tujuan-menurunkan-berat-badan-yaitu-untuk-mendap/10163602824230650" },
  { id: "5", title: "Tips Mengatasi Obesitas", image: require("../assets/articles/tips_obesitas.png"), url: "https://p2ptm.kemkes.go.id/infographic-p2ptm/obesitas/tips-mengatasi-obesitas" },
];

const ArticleList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Articles</Text>
      <FlatList
        horizontal
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.article} onPress={() => Linking.openURL(item.url)}>
            <Image source={item.image} style={styles.articleImage} />
            <Text style={styles.articleTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  article: {
    marginRight: 15,
    width: 150,
  },
  articleImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  articleTitle: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 12,
    color: "#333",
  },
});

export default ArticleList;

