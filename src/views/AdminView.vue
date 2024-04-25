<script setup>
import { onMounted, ref } from "vue";
import { useSurveiStore } from "@/stores/survei";
import { useVillageStore } from "@/stores/villages-old";
import { formatTimestamp, handleError, sleep } from "@/helpers/form-helpers";
import axios from "axios";
import { db } from "@/utils/db";
import { alertLoading, alertSuccess } from "@/helpers/alert-helpers";

import _ from "lodash";

const store = useSurveiStore();
const villagesStore = useVillageStore();
const villages = ref([]);
const information = ref({});

const form = ref({
    date: new Date().toISOString().slice(0, 10),
    parent: '',
    lokasi: '',
});

const dataSurvei = ref();

const fetchData = async () => {
    try {
        const response = await axios.get('http://103.210.54.17:8003/dashboard/survei/api/v1/data/');
        const data = response.data.results;
        dataSurvei.value = data;
    } catch (e) {
        handleError(e);
    }
}

const handleSearchWilayah = _.throttle(async (search) => {
    try {
        const response = await axios.get(`http://103.210.54.17:8003/dashboard/masters/api/v1/daftar_desa/?s=${search}`);

        villages.value = response.data.results;
    } catch (error) {
        console.error(error);
    }
}, 2000);

const fetchVillages = async () => {
    try {
        const response = await axios.get('http://103.210.54.17:8003/dashboard/masters/api/v1/list_desa/');
        villagesStore.setData(response.data);
    } catch (error) {
        console.error(error);
    }
}

onMounted(async () => {

    await fetchData();
    // await sleep(1000);

    // console.log(dataSurvei.value)

    // if (villagesStore.villages.length === 0) {
    //     console.log('[INFO] Data desa tidak ditemukan, memulai fetching ...');
    //     //await fetchVillages()
    // } else {
    //     console.log('[INFO] Data desa ditemukan ...');
    // }
});

const handleSubmit = async () => {
    alertLoading();

    await sleep(1000);

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

    // localStorage.setItem('dataSurvei', JSON.stringify([form.value]));
    // dataSurvei.value = { ...dataSurvei.value, ...form.value };

    try {
        const response = await axios.post('http://103.210.54.17:8003/dashboard/survei/api/v1/data/', form.value);
        console.log('Response:', response)
        await fetchData();
    } catch (error) {
        handleError(error);
    }

    alertSuccess('Data berhasil ditambahkan ...');
}

</script>

<template>
    <div class="row pb-2 border-bottom">
        <div class="col-lg-7">
            <h4>Admin Daftar Survei</h4>
        </div>
        <div class="col-lg-5 d-flex justify-content-end">
            <div>
                <input type="search" class="form-control form-control-sm" placeholder="Pencarian ..." />
            </div>
            <div class="ms-2">
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#actionModal">
                    <i class="fas fa-plus me-2"></i>
                    Tambah Data
                </button>
            </div>
        </div>
    </div>

    <div class="table-responsive small mt-3">
        <table class="table table-bordered table-sm rounded">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Judul Survei</th>
                    <th scope="col">Wilayah</th>
                    <th scope="col">Tanggal Upload</th>
                    <th scope="col">Aksi <i class="fas fa-edit ms-2"></i></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in dataSurvei" :key="index">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>{{ item.parent?.nama }}</td>
                    <td>{{ item.wilayah }}</td>
                    <td>{{ item.tanggal_wawancara }}</td>
                    <td>
                        <div class="list-button py-2">
                            <button type="button" class="badge bg-primary text-white">
                                <i class="fas fa-copy me-1"></i>
                                Duplikat
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
                    </td>
                    <!-- <td class="text-center">1</td>
                    <td>Contoh Judul Survei 1</td>
                    <td>Jan 13, 2023 1:57 PM</td>
                    <td>Kebon Jayanti</td>
                    <td>Kiaracondong</td>
                    <td>Kota bandung</td>
                    <td>Jawa Barat</td>
                    <td>
                        <div class="list-button py-2">
                            <button type="button" class="badge bg-primary text-white">
                                <i class="fas fa-copy me-1"></i>
                                Duplikat
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
                    </td> -->
                </tr>
            </tbody>
        </table>
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
                        <!-- <div class="mb-3">
                            <label for="input__judul" class="form-label required">Judul Survei :</label>
                            <input type="text" class="form-control" :value="information.judul" placeholder="Isikan judul survei anda" disabled />
                        </div> -->

                        <div class="mb-3">
                            <label for="input__survei" class="form-label required">Pilih Sumber Survei :</label>
                            <select id="input__survei" class="form-select" v-model="form.parent" @change="information.judul = $event.target.options[$event.target.selectedIndex].text">
                                <option value="" selected="" disabled>--Pilih sumber--</option>
                                <option v-for="item in store.data" :key="item.id" :value="item.id">
                                    <b>{{ item.kode }}</b> - {{ item.nama }}
                                </option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="input__lokasi" class="form-label required">Lokasi :</label>

                            <v-select :options="villages" v-model="form.lokasi" @search="handleSearchWilayah" label="wilayah"></v-select>
                        </div>

                        <hr class="mx-n4">

                        <div class="mb-3">
                            <label for="input__tanggal_wawancara" class="form-label required">Tanggal Wawancara :</label>

                            <input type="date" id="input__tanggal_wawancara" class="form-control" v-model="form.tanggal_wawancara" />
                        </div>

                        <div class="row mb-3 justify-content-between">
                            <div class="col-lg-6 mb-3">
                                <label for="input__waktu-mulai" class="form-label required">Waktu Mulai :</label>

                                <input type="time" id="input__waktu-mulai" class="form-control" v-model="form.waktu_mulai" />
                            </div>
                            <div class="col-lg-6 mb-3">
                                <label for="input__waktu-akhir" class="form-label required">Waktu Berakhir :</label>

                                <input type="time" id="input__waktu-akhir" class="form-control" v-model="form.waktu_akhir" />
                            </div>
                        </div>

                        <hr class="mx-n4">

                        <div class="mb-3">
                            <label for="input__petugas_nama" class="form-label required">Nama Petugas :</label>

                            <input type="text" id="input__petugas_nama" class="form-control" v-model="form.nama_petugas" />
                        </div>

                        <div class="mb-3">
                            <label for="input__petugas_nik" class="form-label required">NIK Petugas :</label>

                            <input type="text" id="input__petugas_nik" class="form-control" v-model="form.nik_petugas" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="fas fa-xmark me-2"></i>
                            Tutup
                        </button>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                            <i class="fas fa-save me-2"></i>
                            Simpan Data
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- <div class="row mt-5 mb-4 pb-2 border-bottom">
        <div class="col-lg-9">
            <h4>Formulir Pengisian <i class="ms-2 fas fa-edit fa-sm "></i></h4>
        </div>
    </div>

    <div class="card shadow">
        <div class="card-body">
            <form @submit="handleSubmit">
                <div class="mb-3">
                    <label for="input__id" class="form-label">ID</label>
                    <input type="number" class="form-control" id="input__id" disabled>
                </div>

                <div class="mb-3">
                    <label for="input__date" class="form-label required">Tanggal</label>
                    <input type="date" class="form-control" id="input__date" v-model="form.date" disabled>
                </div>

                <div class="mb-3">
                    <label for="input__desa" class="form-label required">Desa</label>
                    <input type="text" class="form-control" id="input__desa">
                </div>


                <div class="d-flex justify-content-end">
                    <div>
                        <button type="submit" class="btn btn-primary mt-2">
                            <i class="fas fa-save me-2"></i>
                            Simpan Data
                        </button>
                    </div>
                </div>

            </form>
        </div>
    </div> -->
</template>