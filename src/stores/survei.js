import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { db } from "@/utils/db";

export const useSurveiStore = defineStore("survei", () => {
	const getData = () => {
		const storedData = JSON.parse(localStorage.getItem('surveys'));

		if (storedData) return storedData;

		return [];
	};

    const setData = (value) => {
        data.value = value;
		localStorage.setItem('surveys', JSON.stringify(data.value));
    };

	const data = ref(getData());

    return { data, setData };
});
