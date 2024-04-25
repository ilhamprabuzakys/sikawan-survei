<script setup>
import { onMounted, ref } from "vue";
import { useSurveiStore } from "@/stores/survei";
import { dt_lang_config, formatDate, handleError, sleep } from "@/helpers/form-helpers";
import axios from "axios";
import { alertLoading, alertSuccess, hideModal } from "@/helpers/alert-helpers";
import InputMask from 'primevue/inputmask';
import _ from "lodash";

import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';

DataTable.use(DataTablesCore);

const store = useSurveiStore();
const villages = ref([]);

const form = ref({ parent: '', lokasi: '' });

const dataSurvei = ref();

const fetchData = async () => {
    try {
        const response = await axios.get('/dashboard/survei/api/v1/data/');
        dataSurvei.value = response.data.results;
    } catch (e) {
        handleError(e);
    }
}

const handleSearchWilayah = _.throttle(async (search) => {
    try {
        const response = await axios.get(`/dashboard/masters/api/v1/daftar_desa/?s=${search}`);
        villages.value = response.data.results;
    } catch (e) {
        console.error(e);
    }
}, 2000);

const handleSubmit = async () => {
    alertLoading();

    await sleep(1000);

    form.value.parent = form.value.parent.id;
    form.value.wilayah = form.value.lokasi.wilayah;
    form.value.nama_provinsi = form.value.lokasi.nama_provinsi;
    form.value.nama_kabupaten = form.value.lokasi.nama_kabupaten;
    form.value.nama_kecamatan = form.value.lokasi.nama_kecamatan;
    form.value.nama_desa = form.value.lokasi.nama_desa;

    form.value.provinsi = form.value.lokasi.provinsi;
    form.value.kabupaten = form.value.lokasi.kabupaten;
    form.value.kecamatan = form.value.lokasi.kecamatan;
    form.value.desa = form.value.lokasi.desa;

    console.log('Form:', form.value);

    try {
        await axios.post('/dashboard/survei/api/v1/data/', form.value);
        await fetchData();
        alertSuccess('Data berhasil ditambahkan ...');
        hideModal();
    } catch (e) {
        handleError(e);
    }
}

// DataTable
let dt;
const table = ref();

const columns = [
    { data: null, render: "#numbering", class: 'text-center', width: "5%" },
    { data: null, title: 'Nama', render: "#nama" },
    { data: 'wilayah', title: 'Wilayah' },
    {
        data: 'tanggal_wawancara', width: "10%", title: 'Tgl. Wawancara',
        render: (data, type, row) => formatDate(data)
    },
    { data: 'id', render: "#action", width: "8%" },
];

const options = { language: dt_lang_config() };

onMounted(async () => {
    dt = table.value.dt;
    await fetchData();
});
</script>

<template>
    <div class="row pb-2 border-bottom">
        <div class="col-lg-7">
            <h4>Admin Daftar Survei</h4>
        </div>
        <div class="col-lg-5 d-flex justify-content-end">
            <div>
                <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#actionModal">
                    <i class="fas fa-plus me-2"></i>
                    Tambah Data
                </button>
            </div>
        </div>
    </div>

    <div class="table-responsive small mt-3">
        <DataTable :data="dataSurvei" :options="options" :columns="columns" class="table table-bordered" ref="table">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Judul Survei</th>
                    <th scope="col">Wilayah</th>
                    <th scope="col" style="width: 100px">Tanggal Upload</th>
                    <th scope="col">Aksi <i class="fas fa-edit ms-2"></i></th>
                </tr>
            </thead>
            <template #nama="props">
                <span>{{ props.rowData.parent?.nama }}</span>
            </template>
            <template #numbering="props">
                {{ props.rowIndex+1 }}
            </template>
            <template #action="props">
                <div class="list-button py-2">
                    <button type="button" class="badge bg-primary text-white">
                        <i class="fas fa-eye me-1"></i>
                        Lihat
                    </button>
                    <button type="button" class="badge bg-success text-white">
                        <i class="fas fa-edit me-1"></i>
                        Edit
                    </button>
                    <button type="button" class="badge bg-danger text-white">
                        <i class="fas fa-xmark me-1"></i>
                        Hapus
                    </button>
                </div>
            </template>
        </DataTable>
    </div>

    <div class="modal fade" id="actionModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <b>Formulir Pengisian</b>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="input__survei" class="form-label required">Pilih Sumber Survei :</label>
                            <v-select id="input__survei" :options="store.sumber" v-model="form.parent" label="nama" placeholder="--Pilih sumber--" required>
                                <template #no-options>Data yang anda cari tidak ditemukan.</template>
                                <template #option="{ kode, nama }"><span><b>{{ kode }}</b> - {{ nama }}</span></template>
                            </v-select>
                        </div>

                        <div class="mb-3">
                            <label for="input__lokasi" class="form-label required">Lokasi :</label>

                            <v-select id="input__lokasi" :options="villages" v-model="form.lokasi" @search="handleSearchWilayah" label="wilayah" placeholder="--Pilih lokasi--" required>
                                <template #no-options>Data yang anda cari tidak ditemukan.</template>
                                <div class="spinner" v-show="spinner">Loading...</div>
                            </v-select>
                        </div>

                        <hr class="mx-n4">

                        <div class="mb-3">
                            <label for="input__tanggal_wawancara" class="form-label required">Tanggal Wawancara :</label>
                            <input type="date" id="input__tanggal_wawancara" class="form-control" v-model="form.tanggal_wawancara" required />
                        </div>

                        <div class="row mb-3 justify-content-between">
                            <div class="col-lg-6 mb-3">
                                <label for="input__waktu-mulai" class="form-label required">Waktu Mulai :</label>
                                <input type="time" id="input__waktu-mulai" class="form-control" v-model="form.waktu_mulai" required />
                            </div>
                            <div class="col-lg-6 mb-3">
                                <label for="input__waktu-akhir" class="form-label required">Waktu Berakhir :</label>
                                <input type="time" id="input__waktu-akhir" class="form-control" v-model="form.waktu_akhir" required />
                            </div>
                        </div>

                        <hr class="mx-n4">

                        <div class="mb-3">
                            <label for="input__petugas_nama" class="form-label required">Nama Petugas :</label>
                            <input type="text" id="input__petugas_nama" class="form-control" v-model="form.nama_petugas" placeholder="Nama dari petugas pelaksana" required />
                        </div>

                        <div class="mb-3">
                            <label for="input__petugas_nik" class="form-label required">NIK Petugas :</label>
                            <InputMask
                                id="ssn"
                                v-model="form.nik_petugas"
                                mask="9999999999999999"
                                placeholder="________________"
                                class="form-control"
                                required
                            />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="fas fa-xmark me-2"></i>
                            Tutup
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save me-2"></i>
                            Simpan Data
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>