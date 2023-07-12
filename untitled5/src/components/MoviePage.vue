<template>
  <div>
    <Header>Task</Header>
    <h1>Варианты доступных карт фильмов</h1>
    <div class="movie-page" @mousemove="handleMouseMove">
      <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @delete="deleteMovie(movie.id)"
          @click="openMovie(movie.id)"
          :class="{ 'open': movie.id === openMovieId }">
        <template v-slot:actions>
          <button class="action-button" @click="addToFavorites(movie)">Добавить в избранное</button>
          <button class="action-button" @click="addToWatchlist(movie)">Добавить в список просмотра</button>
          <button class="action-button delete-button" @click="deleteMovie(movie.id)">Удалить</button>
        </template>
      </MovieCard>
    </div>

    <div class="lists-container">
      <div class="list1">
        <h2>Список избранного</h2>
        <ul>
          <li v-for="favoriteMovie in favoriteMovies" :key="favoriteMovie.id">
            {{ favoriteMovie.title }}
            <button class="delete-button-list" @click="deleteFromList(favoriteMovie.id, 'favoriteMovies')">Удалить</button>
          </li>
        </ul>
      </div>

      <div class="list2">
        <h2>Список просмотра</h2>
        <ul>
          <li v-for="watchlistMovie in watchlistMovies" :key="watchlistMovie.id">
            {{ watchlistMovie.title }}
            <button class="delete-button-list" @click="deleteFromList(watchlistMovie.id, 'watchlistMovies')">Удалить</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from './MovieCard.vue';
import axios from 'axios';
import Header from "@/App.vue";

export default {
  components: {
    Header,
    MovieCard
  },
  data() {
    return {
      movies: [], // Массив фильмов
      favoriteMovies: [], // Список избранного
      watchlistMovies: [], // Список просмотра
      openMovieId: null // Идентификатор текущего открытого фильма
    };
  },
  created() {
    this.loadMovies();
  },
  methods: {
    async loadMovies() {
      try {
        const apiKey = 'e01ffe1c66cbb475893aa1494a0e6834';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        this.movies = response.data.results;
      } catch (error) {
        console.error(error);
        this.movies = [];
      }
    },
    addToFavorites(movie) {
      // Логика добавления фильма в избранное
      this.favoriteMovies.push(movie);
    },
    addToWatchlist(movie) {
      // Логика добавления фильма в список просмотра
      this.watchlistMovies.push(movie);
    },
    deleteMovie(movieId) {
      // Логика удаления фильма по идентификатору
      this.movies = this.movies.filter(movie => movie.id !== movieId);
      this.favoriteMovies = this.favoriteMovies.filter(movie => movie.id !== movieId);
      this.watchlistMovies = this.watchlistMovies.filter(movie => movie.id !== movieId);
    },
    deleteFromList(movieId, listName) {
      // Логика удаления фильма из указанного списка
      if (listName === 'favoriteMovies') {
        this.favoriteMovies = this.favoriteMovies.filter(movie => movie.id !== movieId);
      } else if (listName === 'watchlistMovies') {
        this.watchlistMovies = this.watchlistMovies.filter(movie => movie.id !== movieId);
      }
    },

    resetCard() {
      this.openMovieId = null;
      this.$refs.movieCards.forEach(card => card.resetCard());
    },
    openMovie(id) {
      this.openMovieId = id;

      setTimeout(() => {
        this.resetCard();
      }, 15000);
    }

  }
};
</script>

<style scoped>
.movie-page {
  position: static;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 100%;
  margin: 0 auto;
}

.lists-container {
  margin: 0 auto;
  max-width: 600px;
  border: 1px solid #ccc;
  padding: 10px;

}
/* Списки просмотров */
.list1,
.list2 {
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f5f5f5;
}

.list1 h2,
.list2 h2 {
  color: #333;
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 10px;
}

.list1 ul,
.list2 ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.list1 li,
.list2 li {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
  color: #678;
}

.list1 li:last-child,
.list2 li:last-child {
  border-bottom: none;
}

.list1 li:hover,
.list2 li:hover {
  background-color: #e0e0e0;
  cursor: pointer;
}
h1 {
  text-align: center;
  margin-top: auto;
  color: #CD6600;
  font-size: 40px;
  position: sticky;
}
.open {
  transform: rotateY(0deg) scale(1.1);
}
.movie-details h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}
.movie-details p {
  font-size: 1rem;
  color: #555;
}
/* Кнопки */
.action-button {
  border: 2px solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
  outline-offset: 0px;
  text-shadow: none;
  transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  color: blue;
  background-color: #55d1ff;
}

.action-button:hover {
  border: 2px solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2);
  outline-color: rgba(255, 255, 255, 0);
  outline-offset: 15px;
  text-shadow: 1px 1px 2px #427388;
  color: yellow;
}
.delete-button {
  color: red;
  border: 1px solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2);
  outline-color: rgba(255, 255, 255, 0);
  outline-offset: 15px;
  text-shadow: 1px 1px 2px #427388;
}
.delete-button-list {
  color: red;
  border: 1px solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2);
  outline-color: rgba(255, 255, 255, 0);
  outline-offset: 15px;
  text-shadow: 1px 1px 2px #427388;
}
</style>
