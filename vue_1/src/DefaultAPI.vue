<script>
export default {
    data() {
        return {
            name: "Parth",
            status: 'pending',
            tasks: ["Task one", "Task two", "Task three"],
            link: "https://unsplash.com/photos/a-person-swimming-over-a-coral-reef-with-lots-of-fish-xDQKvPjxtxo"
        }
    },
    methods: {
        changeStatus() {
            if (this.status === 'active') {
                this.status = 'pending'
            } else if (this.status === 'pending') {
                this.status = 'inactive'
            } else {
                this.status = 'active'
            }
        }
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
    <a v-bind:href="link">click for image</a>

    <br>
    <!--    <button v-on:click="changeStatus">change status</button>-->
    <button @click="changeStatus">change status</button>
</template>
