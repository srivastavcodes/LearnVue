<script setup>
import {onMounted, reactive} from "vue";
import {useToast} from "vue-toastification";
import {useRoute, useRouter} from "vue-router";

import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import axios from "axios";

const route = useRoute()
const toast = useToast()
const router = useRouter()

const jobId = route.params.id
const state = reactive({
    job: {},
    isLoading: true
})

const data = reactive({
    type: 'Full-Time',
    title: '',
    description: '',
    salary: '',
    location: '',
    company: {
        name: '',
        description: '',
        contactEmail: '',
        contactPhone: ''
    }
})

const handleSubmit = async () => {
    const updatedJob = {
        type: data.type,
        title: data.title,
        description: data.description,
        salary: data.salary,
        location: data.location,
        company: {
            name: data.company.name,
            description: data.company.description,
            contactEmail: data.company.contactEmail,
            contactPhone: data.company.contactPhone
        }
    }
    try {
        const response = await axios.put(`/api/jobs/${jobId}`, updatedJob)
        toast.success('Job updated successfully', {
            timeout: 3000
        })
        router.push(`/jobs/${response.data.id}`)
    } catch (error) {
        console.log(`Error posting newJob ${error}`)
        toast.error('Job could not be added', {
            timeout: 3000
        })
    }
}

onMounted(async () => {
    try {
        const response = await axios.get(`/api/jobs/${jobId}`)
        state.job = response.data
        Object.assign(data, state.job)
    } catch (error) {
        console.error(`Error fetching job ${error}`)
    } finally {
        state.isLoading = false
    }
})
</script>

<template>
    <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader/>
    </div>
    <section v-else class="bg-green-50">
        <div class="container m-auto max-w-2xl py-24">
            <div
                class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleSubmit">
                    <h2 class="text-3xl text-center font-semibold mb-6">Edit Job</h2>

                    <div class="mb-4">
                        <label for="type" class="block text-gray-700 font-bold mb-2">Job Type</label>

                        <select v-model="data.type" id="type" name="type" class="border rounded w-full py-2 px-3" required>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Remote">Remote</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Job Listing Name</label>
                        <input type="text" id="name" name="name"
                               v-model="data.title"
                               class="border rounded w-full py-2 px-3 mb-2"
                               placeholder="eg. Beautiful Apartment In Miami" required/>
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea id="description" name="description"
                                  v-model="data.description"
                                  class="border rounded w-full py-2 px-3"
                                  rows="4" placeholder="Add any job duties, expectations, requirements, etc"
                        ></textarea>
                    </div>

                    <div class="mb-4">
                        <label for="type" class="block text-gray-700 font-bold mb-2">Salary</label>
                        <select v-model="data.salary" id="salary"
                                name="salary" class="border rounded w-full py-2 px-3" required
                        >
                            <option value="Under $50K">under $50K</option>
                            <option value="$50K - $60K">$50 - $60K</option>
                            <option value="$60K - $70K">$60 - $70K</option>
                            <option value="$70K - $80K">$70 - $80K</option>
                            <option value="$80K - $90K">$80 - $90K</option>
                            <option value="$90K - $100K">$90 - $100K</option>
                            <option value="$100K - $125K">$100 - $125K</option>
                            <option value="$125K - $150K">$125 - $150K</option>
                            <option value="$150K - $175K">$150 - $175K</option>
                            <option value="$175K - $200K">$175 - $200K</option>
                            <option value="Over $200K">Over $200K</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Location</label>
                        <input type="text" id="location" name="location"
                               v-model="data.location"
                               class="border rounded w-full py-2 px-3 mb-2" placeholder="Company Location" required/>
                    </div>

                    <h3 class="text-2xl mb-5">Company Info</h3>

                    <div class="mb-4">
                        <label for="company" class="block text-gray-700 font-bold mb-2">Company Name</label>
                        <input type="text" id="company" name="company"
                               v-model="data.company.name"
                               class="border rounded w-full py-2 px-3" placeholder="Company Name"/>
                    </div>

                    <div class="mb-4">
                        <label for="company_description" class="block text-gray-700 font-bold mb-2">Company Description</label>
                        <textarea id="company_description" name="company_description"
                                  v-model="data.company.description"
                                  class="border rounded w-full py-2 px-3" rows="4" placeholder="What does your company do?"
                        ></textarea>
                    </div>

                    <div class="mb-4">
                        <label for="contact_email" class="block text-gray-700 font-bold mb-2">Contact Email</label>
                        <input type="email" id="contact_email" name="contact_email"
                               v-model="data.company.contactEmail"
                               class="border rounded w-full py-2 px-3" placeholder="Email address for applicants" required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="contact_phone" class="block text-gray-700 font-bold mb-2">Contact Phone</label>
                        <input type="tel" id="contact_phone" name="contact_phone"
                               v-model="data.company.contactPhone"
                               class="border rounded w-full py-2 px-3" placeholder="Optional phone for applicants"
                        />
                    </div>

                    <div>
                        <button
                            class="bg-green-500 hover:bg-green-600 text-white font-bold
                            py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline" type="submit"
                        >Update Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
