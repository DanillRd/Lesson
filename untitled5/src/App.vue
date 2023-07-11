<template>
    <div class="app">
        <Header />
        <div class="main-content">
            <router-view />
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';
import { getCards } from './api.js';

export default {
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            movies: [],
        };
    },
    async created() {
        this.movies = await getCards();
    },
};
</script>

<style>
.app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.main-content {
    flex: 1; /* Занимает оставшуюся доступную высоту, чтобы футер прилипал к низу */
    padding-bottom: 60px; /* Добавляем отступ внизу, чтобы футер не перекрывал контент */
}

/* Стили для header оставляем без изменений */

header {
    position: sticky;
    top: 0;
    width: 110%;
    background-color: #007bff;
    color: #fff;
    padding: 20px;
    text-align: center;
}

/* Стили для footer */

footer {
    background-color: #f0f0f0;
    padding: 10px;
    text-align: center;
    position: sticky;
    bottom: 0;
    width: 100%;
    margin-top: 20px; /* Добавляем отступ сверху, чтобы футер не налагался на header */
}
</style>




