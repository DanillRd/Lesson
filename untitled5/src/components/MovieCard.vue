<template>
  <div class="card" @click="toggleMovie" @mouseenter="startTimer" @mouseleave="resetTimer">
    <div class="card-inner" :class="{ 'flipped': isFlipped }">
      <div class="card-front">
        <div class="image-wrapper">
          <img :src="getImageUrl(movie.poster_path)" alt="Movie Poster">
        </div>
      </div>
      <div class="card-back">
        <div class="content">
          <h2>{{ movie.title }}</h2>
          <p>{{ movie.overview }}</p>
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
      this.resetTimer();
      this.timer = setTimeout(this.resetCard, 10000); // 10 секунд
    },
    resetTimer() {
      clearTimeout(this.timer);
    },
    resetCard() {
      this.isFlipped = false;
    }
  },
  computed: {
    cardClass() {
      return {
        'flipped': this.isFlipped
      };
    }
  }
};
</script>

<style scoped>
.card {
  width: 240px; /* Измените на желаемую ширину карты */
  height: 360px; /* Измените на желаемую высоту карты */
  position: relative;
  perspective: 800px;
  margin-bottom: 20px;
}

.card-inner {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 0.6s;
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
}

h2 {
  font-size: 1.5rem;
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
.open {
  transform: rotateY(180deg) scale(1.2); }
</style>


