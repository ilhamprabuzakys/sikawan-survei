<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { dt_lang_config, handleError, formatTimestamp, sleep } from "@/helpers/form-helpers";
import { useSurveiStore } from "@/stores/survei";

import "survey-core/defaultV2.min.css";
import { Model } from 'survey-core';

import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';

DataTable.use(DataTablesCore);

const store = useSurveiStore();
const survei = ref({ questions: null, instance: null });
const showPreview = ref(false);

const fetchData = async () => {
    try {
        const response = await axios.get('/dashboard/survei/api/v1/tipe/');
        store.setDataSumber(response.data);
    } catch (e) {
        handleError(e)
    }
};

const handleDownload = (data) => {
    const url = window.URL.createObjectURL(new Blob([JSON.stringify(data.daftar_pertanyaan)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    const fileName = `${data.id}-survei.json`;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
};

const alertResults = (sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
};

const enablePreview = (data) => {
    showPreview.value = true;
    survei.value.questions = data;
    survei.value.instance = new Model(data.daftar_pertanyaan);
    survei.value.instance.onComplete.add(alertResults);
};

// DataTable
let dt;
const table = ref();

const columns = [
    { data: null, render: "#numbering", class: 'text-center' },
    { data: 'nama', title: 'Nama', render: "#nama" },
    { data: 'kode', title: 'Kode', class: 'text-center', },
    {
        data: 'created_at', title: 'Dibuat',
        render: (data, type, row) => formatTimestamp(data)
    },
    { data: 'id', render: "#action" },
];

const options = { language: dt_lang_config() };

onMounted(async () => {
    dt = table.value.dt;

    if (store.sumber.length === 0) {
        console.log('Sumber data survei masih kosong, akan memuat ulang ...', store.data);
        await fetchData();
    } else {
        console.log('Sumber data survei sudah ada ...');
    }
});
</script>

<template>
    <div class="row pb-2 border-bottom">
        <div class="col-lg-9">
            <h4>Database Survei</h4>
        </div>
    </div>

    <div class="table-responsive mt-3 small">

        <DataTable :data="store.sumber" :options="options" :columns="columns" class="table table-bordered" ref="table">
            <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Judul Survei</th>
                    <th scope="col" class="text-center">Kode</th>
                    <th scope="col">Waktu Dibuat</th>
                    <th scope="col">Aksi</th>
                </tr>
            </thead>
            <template #nama="props">
                <span @click="enablePreview(props.rowData)" class="cursor-pointer h-underline">{{ props.cellData }}</span>
            </template>
            <template #numbering="props">
                {{ props.rowIndex+1 }}
            </template>
            <template #action="props">
                <div class="list-button">
                    <button type="button" class="badge bg-primary text-white" @click="enablePreview(props.rowData)">
                        <i class="fas fa-eye me-1"></i>
                        Lihat survei
                    </button>
                </div>
            </template>
        </DataTable>
    </div>


    <template v-if="showPreview">
        <transition>
            <div>
                <hr>
                <div class="row pb-2 mt-3 border-bottom">
                    <div class="col-lg-9">
                        <h4>Pratinjau Survei - <b>{{ survei.questions.nama }}</b> <b>({{ survei.questions.id }})</b>
                        </h4>
                    </div>
                    <div class="col-lg-3 d-flex justify-content-end">
                        <div>
                            <button class="btn btn-sm btn-light me-4" @click="showPreview = false">
                                <i class="fas fa-xmark me-2"></i>
                                Hide
                            </button>
                            <button class="btn btn-sm btn-primary" @click="handleDownload(survei.questions)">
                                <i class="fas fa-download me-2"></i>
                                Unduh Survei
                            </button>
                        </div>
                    </div>
                </div>

                <div class="p-3">
                    <SurveyComponent :model="survei.instance" />
                </div>
            </div>
        </transition>
    </template>
</template>