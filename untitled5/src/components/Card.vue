<template>
    <div class="card">
        <h2>{{ data.title }}</h2>
        <p>{{ data.description }}</p>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style>
/* Стили для карточек */
.card {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}
/* Стили для заголовка в карточках */
h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

/* Стили для описания в карточках */
p {
    font-size: 16px;
}
</style>

