<script setup>
import { onMounted, ref } from "vue";

const form = ref({
    date: new Date().toISOString().slice(0, 10),
});

onMounted(() => {
    //
});

const handleSubmit = () => {
    console.log('Form:', form.value);
}

</script>

<template>
    <div class="row pb-2 border-bottom">
        <div class="col-lg-9">
            <h4>Admin Daftar Survei</h4>
        </div>
        <div class="col-lg-3">
            <input type="search" class="form-control form-control-sm" placeholder="Pencarian ..." />
        </div>
    </div>

    <div class="table-responsive small mt-3">
        <table class="table table-bordered table-sm rounded">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Judul Survei</th>
                    <th scope="col">Tanggal Upload</th>
                    <th scope="col">Desa</th>
                    <th scope="col">Kecamatan</th>
                    <th scope="col">Kabupaten</th>
                    <th scope="col">Provinsi</th>
                    <th scope="col">Aksi <i class="fas fa-edit ms-2"></i></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-center">1</td>
                    <td>Contoh Judul Survei 1</td>
                    <td>Jan 13, 2023 1:57 PM</td>
                    <td>Kebon Jayanti</td>
                    <td>Kiaracondong</td>
                    <td>Kota bandung</td>
                    <td>Jawa Barat</td>
                    <td>
                        <div class="list-button">
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
                </tr>
            </tbody>
        </table>
    </div>

    <div class="row mt-5 mb-4 pb-2 border-bottom">
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

                <!-- <div class="mb-3">
                    <label for="input__kecamatan" class="form-label">Kecamatan</label>
                    <input type="text" class="form-control" id="input__kecamatan">
                </div>

                <div class="mb-3">
                    <label for="input__kabupaten" class="form-label">Kabupaten</label>
                    <input type="text" class="form-control" id="input__kabupaten">
                </div>

                <div class="mb-3">
                    <label for="input__provinsi" class="form-label">Provinsi</label>
                    <input type="text" class="form-control" id="input__provinsi">
                </div> -->


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
    </div>
</template>
