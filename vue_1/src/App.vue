<script setup>
import {ref} from "vue";

const name = ref("Parth")
const status = ref("active")
const tasks = ref(["Task one", "Task two", "Task three"])
const newTask = ref("")

const changeStatus = () => {
    if (status.value === 'active') {
        status.value = 'pending'
    } else if (status.value === 'pending') {
        status.value = 'inactive'
    } else {
        status.value = 'active'
    }
}

const addTask = () => {
    if (newTask.value.valueOf().trim() !== '') {
        tasks.value.push(newTask.value)
        newTask.value = ''
    }
}

const deleteTask = (index) => {
    tasks.value.splice(index, 1)
}
</script>

<template>
    <h1>{{ name }}</h1>
    <br>

    <p v-if="status === 'active'">user is active</p>
    <p v-else-if="status === 'pending'">user is pending</p>
    <p v-else>user is inactive</p>
    <br>

    <form @submit.prevent="addTask">
        <label for="newTask">Add Task: </label>
        <input type="text" id="newTask" name="newTask" v-model="newTask"/>
        <button type="submit">submit</button>
    </form>
    <br>

    <h3>Tasks:</h3>
    <br>
    <ul>
        <li v-for="(task, idx) in tasks" :key="task">
            <span>
            {{ task }}
            </span>
            <button @click="deleteTask(idx)">x</button>
        </li>
    </ul>

    <br>
    <!--    <button v-on:click="changeStatus">change status</button>-->
    <button @click="changeStatus">change status</button>
</template>
