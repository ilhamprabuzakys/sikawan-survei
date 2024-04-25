<script setup>
import { ref } from "vue";

const showDetailResponden = ref(false);

</script>

<template>
    <div class="row pb-2 border-bottom">
        <div class="col-lg-9">
            <h4>Daftar Survei <i class="fas fa-tasks ms-2 text-primary"></i></h4>
        </div>
        <div class="col-lg-3">
            <input type="search" class="form-control" placeholder="Pencarian ..." />
        </div>
    </div>

    <div class="table-responsive mt-3 small">
        <table class="table table-bordered table-sm rounded">
            <thead>
                <tr>
                    <th scope="col" class="text-center">No.</th>
                    <th scope="col">Judul</th>
                    <th scope="col">Waktu Mulai</th>
                    <th scope="col">Waktu Berakhir</th>
                    <th scope="col" class="text-center" style="width: 150px">Total Responden</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-center">1</td>
                    <td>Contoh Judul Survei 1</td>
                    <td>Jan 13, 2023 1:57 PM</td>
                    <td>Jan 14, 2023 1:57 PM</td>
                    <td>20 orang</td>
                </tr>
                <tr>
                    <td class="text-center">2</td>
                    <td>Contoh Judul Survei 2</td>
                    <td>Jan 13, 2023 1:57 PM</td>
                    <td>Jan 14, 2023 1:57 PM</td>
                    <td>20 orang</td>
                </tr>
                <tr>
                    <td class="text-center">3</td>
                    <td>Contoh Judul Survei 3</td>
                    <td>Jan 13, 2023 1:57 PM</td>
                    <td>Jan 14, 2023 1:57 PM</td>
                    <td>20 orang</td>
                </tr>
                <tr>
                    <td class="text-center">4</td>
                    <td>Contoh Judul Survei 4</td>
                    <td>Jan 13, 2023 1:57 PM</td>
                    <td>Jan 14, 2023 1:57 PM</td>
                    <td>20 orang</td>
                </tr>
                <tr>
                    <td class="text-center">5</td>
                    <td>Contoh Judul Survei 5</td>
                    <td>Jan 13, 2023 1:57 PM</td>
                    <td>Jan 14, 2023 1:57 PM</td>
                    <td>20 orang</td>
                </tr>
                <tr>
                    <td class="text-center">6</td>
                    <td>Contoh Judul Survei 6</td>
                    <td>Jan 13, 2023 1:57 PM</td>
                    <td>Jan 14, 2023 1:57 PM</td>
                    <td>20 orang</td>
                </tr>
                <tr>
                    <td class="text-center">7</td>
                    <td>Contoh Judul Survei 7</td>
                    <td>Jan 13, 2023 1:57 PM</td>
                    <td>Jan 14, 2023 1:57 PM</td>
                    <td>20 orang</td>
                </tr>
                <tr>
                    <td colspan="5">
                        <div class="text-center text-secondary fw-semibold">7 results</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div id="detailResponden" v-show="showDetailResponden">
        <div class="row mt-3 pb-2 border-bottom">
            <div class="col-lg-9">
                <h4>Data Responden <i class="fas fa-users ms-2 text-warning"></i></h4>
            </div>
            <div class="col-lg-3">
                <input type="search" class="form-control" placeholder="Pencarian ..." />
            </div>
        </div>

        <div class="table-responsive mt-3 small">
            <table class="table table-bordered table-sm rounded">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">ID</th>
                        <th scope="col">Judul</th>
                        <th scope="col">Tgl Mulai Survei</th>
                        <th scope="col">Terakhir Survei</th>
                        <th scope="col">Total Responden</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">1</td>
                        <td>Contoh Judul Survei 1</td>
                        <td>Jan 13, 2023 1:57 PM</td>
                        <td>Jan 14, 2023 1:57 PM</td>
                        <td>20 orang</td>
                    </tr>
                    <tr>
                        <td class="text-center">2</td>
                        <td>Contoh Judul Survei 2</td>
                        <td>Jan 13, 2023 1:57 PM</td>
                        <td>Jan 14, 2023 1:57 PM</td>
                        <td>20 orang</td>
                    </tr>
                    <tr>
                        <td class="text-center">3</td>
                        <td>Contoh Judul Survei 3</td>
                        <td>Jan 13, 2023 1:57 PM</td>
                        <td>Jan 14, 2023 1:57 PM</td>
                        <td>20 orang</td>
                    </tr>
                    <tr>
                        <td class="text-center">4</td>
                        <td>Contoh Judul Survei 4</td>
                        <td>Jan 13, 2023 1:57 PM</td>
                        <td>Jan 14, 2023 1:57 PM</td>
                        <td>20 orang</td>
                    </tr>
                    <tr>
                        <td class="text-center">5</td>
                        <td>Contoh Judul Survei 5</td>
                        <td>Jan 13, 2023 1:57 PM</td>
                        <td>Jan 14, 2023 1:57 PM</td>
                        <td>20 orang</td>
                    </tr>
                    <tr>
                        <td class="text-center">6</td>
                        <td>Contoh Judul Survei 6</td>
                        <td>Jan 13, 2023 1:57 PM</td>
                        <td>Jan 14, 2023 1:57 PM</td>
                        <td>20 orang</td>
                    </tr>
                    <tr>
                        <td class="text-center">7</td>
                        <td>Contoh Judul Survei 7</td>
                        <td>Jan 13, 2023 1:57 PM</td>
                        <td>Jan 14, 2023 1:57 PM</td>
                        <td>20 orang</td>
                    </tr>
                    <tr>
                        <td colspan="5">
                            <div class="text-center text-secondary fw-semibold">7 results</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>