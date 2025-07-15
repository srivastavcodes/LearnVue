<script setup>
import {ref} from "vue";

const name = "Parth"
const status = ref("active")
const tasks = ["Task one", "Task two", "Task three"]

const changeStatus = () => {
    if (status.value === 'active') {
        status.value = 'pending'
    } else if (status.value === 'pending') {
        status.value = 'inactive'
    } else {
        status.value = 'active'
    }
}
</script>

<template>
    <h1>{{ name }}</h1>
    <br>

    <p v-if="status === 'active'">user is active</p>
    <p v-else-if="status === 'pending'">user is pending</p>
    <p v-else>user is inactive</p>
    <br>

    <h3>Tasks:</h3>
    <br>
    <ul>
        <li v-for="task in tasks" :key="task">{{ task }}</li>
    </ul>

    <br>
    <!--    <button v-on:click="changeStatus">change status</button>-->
    <button @click="changeStatus">change status</button>
</template>
