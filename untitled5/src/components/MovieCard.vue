<template>
  <div class="card" @mouseenter="startTimer" @mouseleave="resetTimer">
    <div class="card-inner" :class="{ 'flipped': isFlipped }">
      <div class="card-front" @click="toggleMovie">
        <div class="image-wrapper">
          <img :src="getImageUrl(movie.poster_path)" alt="Movie Poster">
        </div>
      </div>
      <div class="card-back" @click="toggleMovie">
        <div class="content">
          <h2>{{ movie.title }}</h2>
          <p class="overview">{{ truncateText(movie.overview, 150) }}</p>
          <a class="movie-link" :href="'https://www.themoviedb.org/movie/' + movie.id" target="_blank"> Смотреть!</a>
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFlipped: false, // Состояние разворота карты
      timer: null // Таймер для сброса карты
    };
  },
  methods: {
    getImageUrl(posterPath) {
      const baseUrl = 'https://image.tmdb.org/t/p/w500';
      return baseUrl + posterPath;
    },
    toggleMovie() {
      this.isFlipped = !this.isFlipped;
    },
    startTimer() {

      this.timer = setTimeout(() => {
        this.resetCard();
      }, 10000); // 10 секунд
    },
    resetTimer() {
      clearTimeout(this.timer);
    },
    resetCard() {
      this.isFlipped = false;
    },
    truncateText(text, maxLength) {
      if (text.length <= maxLength) {
        return text;
      } else {
        return text.substring(0, maxLength) + '...';
      }
    }
  },

  computed: {
    cardClass() {
      return {
        flipped: this.isFlipped
      };
    }
  }
};
</script>

<style scoped>
.card {
  width: 240px; /* ширина карты */
  height: 360px; /* высота карты */
  position: sticky;
  perspective: 800px;
  margin-bottom: 10px; /* Уменьшен отступ снизу */
  border: 1px solid #ccc; /* Добавлен стиль границы */
  border-radius: 4px; /* Добавлен стиль скругленных углов */
  margin-left: 50px; /* Уменьшен отступ слева */
  margin-right: 50px; /* Уменьшен отступ справа */
  margin-top: 10px;
  font-family: "Gill Sans", sans-serif;
  background-size: cover;
  background-color: lightseagreen;
}

.card-inner {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  border: 3px solid #ccc; /* Добавлен стиль границы */
  border-radius: 4px; /* Добавлен стиль скругленных углов */
  margin-top: auto;
  background-color: #CD6600;
}

.card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  background-color: #CD6600;
}

.card-front {
  transform: rotateY(0deg);
}

.card-back {
  transform: rotateY(180deg);
}

.image-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-wrapper img {
  max-width: 100%;
  max-height: 100%;
  display: block;
}

.content {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  margin-top: auto;
}

h2 {
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 10px;
}
p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
}
.flipped {
  transform: rotateY(180deg) scale(1.2);
}
p.overview {
  font-size: 0.8rem;
  color: #555;
  margin-bottom: 15px;
  max-height: 120px; /* Измените на желаемую максимальную высоту текста */
  overflow: hidden;
  text-overflow: ellipsis;
}
.movie-link {
  color: #007bff;
  text-decoration: none;
  transition: all 0.3s ease-in-out; /* добавляем плавный переход при наведении */
  border: 2px solid #ccc;
}
.movie-link:hover {
  color: #0056b3; /* изменяем цвет текста при наведении */
  border: 2px solid #ccc;
}
</style>




