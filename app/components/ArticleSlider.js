import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const articles = [
  {
    id: 1,
    title: 'Bahaya Obesitas',
    image: require('../assets/news/obesitas.png'),
    url: 'https://puskesmasandalas.padang.go.id/bahaya-obesitas/',
  },
  {
    id: 2,
    title: '6 Bahaya Tubuh Jika Terlalu Kurus',
    image: require('../assets/news/kurus.png'),
    url: 'https://hellodoktor.com/pemakanan/obesiti/risiko-kurang-berat-badan/',
  },
  {
    id: 3,
    title: 'Fakta Seputar Obesitas di Indonesia',
    image: require('../assets/news/fakta_obesitas.png'),
    url: 'https://hellosehat.com/nutrisi/obesitas/fakta-seputar-obesitas-di-indonesia/',
  },
  {
    id: 4,
    title: 'Bahaya Jika Terlalu Kurus',
    image: require('../assets/news/bahaya_kurus.png'),
    url: 'https://web.facebook.com/klikdokter/posts/banyak-yang-salah-kaprah-dengan-tujuan-menurunkan-berat-badan-yaitu-untuk-mendap/10163602824230650/',
  },
  {
    id: 5,
    title: 'Tips Mengatasi Obesitas',
    image: require('../assets/news/tips_obesitas.png'),
    url: 'https://p2ptm.kemkes.go.id/infographic-p2ptm/obesitas/tips-mengatasi-obesitas',
  },
];

export default function ArticleSlider() {
  const openArticle = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Articles</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {articles.map((article) => (
          <TouchableOpacity
            key={article.id}
            style={styles.article}
            onPress={() => openArticle(article.url)}
          >
            <Image source={article.image} style={styles.image} />
            <Text style={styles.articleTitle}>{article.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  article: {
    width: 150,
    marginRight: 10,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  articleTitle: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
});

