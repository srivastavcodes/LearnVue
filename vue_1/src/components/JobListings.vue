<script setup>
import {onMounted, reactive} from "vue";

import JobListingCard from "@/components/JobListingCard.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import axios from "axios";

defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
})
const state = reactive({
    jobs: [],
    isLoading: true
})

onMounted(async () => {
    try {
        const response = await axios.get('/api/jobs')
        state.jobs = response.data
    } catch (error) {
        console.log(`Error fetching jobs: ${error}`)
    } finally {
        state.isLoading = false
    }
})
</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>
            <!--Show loading if isLoading true-->
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader/>
            </div>
            <!--Show job listing when loading is done-->
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JobListingCard
                    v-for="job in (limit ? state.jobs.slice(0, limit) : state.jobs)" :key="state.jobs.id"
                    :job="job"/>
            </div>
        </div>
    </section>

    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink
            to="/jobs"
            class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Jobs
        </RouterLink>
    </section>
</template>
