<script setup>
import { handleError, onMounted, ref } from "vue";
import 'tabulator-tables/dist/css/tabulator.min.css';
import 'survey-analytics/survey.analytics.tabulator.min.css';
import { Model } from 'survey-core';
import { Tabulator } from 'survey-analytics/survey.analytics.tabulator';
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { formatDate, sleep } from "@/helpers/form-helpers";

const route = useRoute();
const router = useRouter();

const dataResponden = ref(null);
const tipeSurvei = ref(null);
const parentSurvei = ref(null);

const fetchDataResponden = async (id) => {
    try {
        const response = await axios.get(`/dashboard/survei/api/v1/responden/?parent=${id}`);
        const data = response.data;
        dataResponden.value = data;
    } catch (e) {
        handleError(e);
    }
};

const fetchData = async (id) => {
    try {
        const response = await axios.get(`/dashboard/survei/api/v1/data/${id}/`);
        const data = response.data;
        tipeSurvei.value = data;
        parentSurvei.value = data.parent;

        await fetchDataResponden(data.id);

    } catch (e) {
        handleError(e);
    }
};

const generateData = () => {
    const data = [];
    const result = dataResponden.value;

    for (let item of result) {
        const hasil = item.hasil;
        const obj = {};
        for (let key in hasil) {
            if (hasil.hasOwnProperty(key)) {
                obj[key] = hasil[key];
            }
        }
        data.push(obj);
    }
    return data;
};

onMounted(async () => {
    await fetchData(route.params.id);

    console.log(dataResponden.value);
    console.log(parentSurvei.value);

    const survey = new Model(parentSurvei.value.daftar_pertanyaan);
    console.log(survey);
    const surveyTable = new Tabulator(survey, generateData());

    surveyTable.render("surveyDataTable");
});

</script>
<template>
    <div v-if="tipeSurvei">
        <div class="row pb-2 mt-3 border-bottom">
            <div class="mb-3 col-lg-9">
                <h4>Hasil Pengisian Survei - <br><b>{{ tipeSurvei?.parent.nama }}</b>
                    <b>({{ tipeSurvei?.parent.kode }})</b>
                </h4>
            </div>
            <div class="mb-3 col-lg-3 d-flex justify-content-end align-items-center">
                <div>
                    <button class="btn btn-sm btn-outline-secondary me-4" @click="(() => router.push('/'))">
                        <i class="fas fa-arrow-left me-2"></i>
                        Kembali
                    </button>
                </div>
            </div>
            <div class="mb-3 col-lg-12">
                <table class="table table-bordered table-sm">
                    <tbody>
                        <tr>
                            <td class="fw-bold ps-3 bg-success text-white">Judul Survei</td>
                            <td>{{ tipeSurvei?.parent.nama }}</td>
                        </tr>
                        <tr>
                            <td class="fw-bold ps-3 bg-success text-white">Lokasi</td>
                            <td>{{ tipeSurvei.wilayah }}</td>
                        </tr>
                        <tr>
                            <td class="fw-bold ps-3 bg-success text-white">Tanggal Wawancara</td>
                            <td>{{ formatDate(tipeSurvei.tanggal_wawancara) }}</td>
                        </tr>
                        <tr>
                            <td class="fw-bold ps-3 bg-success text-white">Waktu</td>
                            <td>{{ tipeSurvei.waktu_mulai }} - {{ tipeSurvei.waktu_akhir }}</td>
                        </tr>
                        <tr>
                            <td class="fw-bold ps-3 bg-primary text-white">Nama Petugas</td>
                            <td>{{ tipeSurvei.nama_petugas }}</td>
                        </tr>
                        <tr>
                            <td class="fw-bold ps-3 bg-primary text-white">NIK Petugas</td>
                            <td>{{ tipeSurvei.nik_petugas }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="p-3">
            <div id="surveyDataTable"></div>
        </div>
    </div>

</template>