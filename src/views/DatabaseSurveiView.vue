<script setup>
import { onMounted, ref } from "vue";

</script>

<template>
    <div class="row pb-2 border-bottom">
        <div class="col-lg-9">
            <h4>Database Survei</h4>
        </div>
        <div class="col-lg-3">
            <input type="search" class="form-control" placeholder="Pencarian ..." />
        </div>
    </div>

    <div class="table-responsive mt-3 small">
        <table class="table table-bordered table-sm rounded">
            <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Judul Survei</th>
                    <th scope="col">Kode</th>
                    <th scope="col">Waktu Dibuat</th>
                    <th scope="col">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-center">1</td>
                    <td>Contoh Judul Survei 1</td>
                    <td>D-801029</td>
                    <td>Jan 13, 2023 1:57 PM</td>
                    <td>
                        <div class="list-button">
                            <button type="button" class="badge bg-primary text-white">
                                <i class="fas fa-download me-1"></i>
                                Unduh Survei
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
