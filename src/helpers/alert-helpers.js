import Swal from "sweetalert2";

const alertLoading = () => {
    Swal.fire({
        title: 'Tunggu sebentar',
        icon: 'info',
        html: `Sedang <b>memproses</b> permintaan anda  ...`,
        showConfirmButton: true,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });
}

const alertConfirm = (text, confirmButtonText) => {
    return Swal.fire({
        title: 'Apakah anda yakin',
        html: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmButtonText ? confirmButtonText : 'Ya, hapus data',
        cancelButtonText: 'Batalkan',
    });
}

const alertSuccess = (title, text, timer) => {
    Swal.fire({
        title: title,
        html: text,
        icon: 'success',
        confirmButtonText: 'OK',
        timer: timer ?? 0,
    });
}

const alertError = (title, text, timer) => {
    Swal.fire({
        title: title,
        html: text,
        icon: 'error',
        confirmButtonText: 'OK',
        timer: timer ?? 0,
    });
}

const alertInfo = (title, text) => {
    Swal.fire({
        title: title,
        html: text,
        icon: 'info',
        confirmButtonText: 'Saya mengerti',
        timer: 0,
    });
}

const alertGenericError = () => {
	Swal.fire({
        title: "Terjadi kesalahan",
        html: `Terjadi kesalahan tidak diketahui, tolong kontak <strong>developer</strong> untuk mengatasi masalah ini.`,
        icon: "error",
        confirmButtonText: "OK",
    });
}

export { alertLoading, alertConfirm, alertSuccess, alertError, alertInfo, alertGenericError }