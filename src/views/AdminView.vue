<template>
  <div class="row my-5 pb-2 border-bottom">
    <div class="col-lg-9">
      <h1 class="h2">Admin Daftar Survei</h1>
    </div>
    <div class="col-lg-3">
      <input type="search" class="form-control" placeholder="Pencarian ..." />
    </div>
  </div>

  <div class="table-responsive small">
    <table class="table table-bordered table-sm rounded">
      <thead>
        <tr>
          <th scope="col" class="text-center">ID</th>
          <th scope="col">Judul Survei</th>
          <th scope="col">Tgl Upload</th>
          <th scope="col">Desa</th>
          <th scope="col">Kecamatan</th>
          <th scope="col">Kabupaten</th>
          <th scope="col">Provinsi</th>
          <th scope="col">Aksi</th>
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
            <a href="javascript:;" class="btn btn-primary text-white w-100">Duplikat</a>
          </td>
        </tr>

        <tr>
          <td colspan="8">
            <div class="text-center text-secondary fw-semibold">7 results</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="row mt-5 mb-4 pb-2 border-bottom">
    <div class="col-lg-9">
      <h1 class="h2">Formulir Pengisian <i class="ms-2 fas fa-edit fa-sm "></i></h1>
    </div>
  </div>

  <div class="card">
    <div class="card-body">
      <form @submit="handleSubmit()">
        <div class="mb-3">
          <label for="input__id" class="form-label">ID <sup class="text-danger ms-1">*</sup></label>
          <input type="number" class="form-control" id="input__id">
        </div>

        <div class="mb-3">
          <label for="input__date" class="form-label">Tanggal <sup class="text-danger ms-1">*</sup></label>
          <input type="date" class="form-control" id="input__date">
        </div>

        <div class="mb-3">
          <label for="input__desa" class="form-label">Desa <sup class="text-danger ms-1">*</sup></label>
          <input type="text" class="form-control" id="input__desa">
        </div>

        <div class="mb-3">
          <label for="input__kecamatan" class="form-label">Kecamatan <sup class="text-danger ms-1">*</sup></label>
          <input type="text" class="form-control" id="input__kecamatan">
        </div>

        <div class="mb-3">
          <label for="input__kabupaten" class="form-label">Kabupaten <sup class="text-danger ms-1">*</sup></label>
          <input type="text" class="form-control" id="input__kabupaten">
        </div>

        <div class="mb-3">
          <label for="input__provinsi" class="form-label">Provinsi <sup class="text-danger ms-1">*</sup></label>
          <input type="text" class="form-control" id="input__provinsi">
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
  </div>
</template>

<script setup>

const handleSubmit = () => {
  console.log('submit');
}

</script>
