import { alertGenericError } from "./alert-helpers";

export const formatTimestamp = (timestamp) => {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const date = new Date(timestamp);
    const dayOfWeek = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedTimestamp = hours + ":" + minutes + ":" + seconds + " - " + dayOfWeek + ", " + day + " " + month + " " + year;
    return formattedTimestamp;
};

export const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

export const handleError = (error) => {
    alertGenericError();

    console.error('Terjadi kesalahan:', error);
}

export const dt_lang_config = () => ({
    sEmptyTable: 'Tidak ada data yang tersedia pada tabel ini',
    sProcessing: 'Sedang memproses...',
    sLengthMenu: 'Tampilkan _MENU_ entri',
    sZeroRecords: 'Tidak ditemukan data yang sesuai',
    sInfo: 'Menampilkan _START_ sampai _END_ dari _TOTAL_ entri',
    sInfoEmpty: 'Menampilkan 0 sampai 0 dari 0 entri',
    sInfoFiltered: '(disaring dari _MAX_ entri keseluruhan)',
    sInfoPostFix: '',
    sSearch: 'Pencarian:',
    sUrl: '',
    oPaginate: {
        sFirst: `<i class="fas fa-angle-double-left"></i>`,
        sPrevious: `<i class="fas fa-angle-left"></i>`,
        sNext: `<i class="fas fa-angle-right"></i>`,
        sLast: `<i class="fas fa-angle-double-right"></i>`,

        // sFirst: 'Awal',
        // sPrevious: 'Sebelumnya',
        // sNext: 'Berikutnya',
        // sLast: 'Akhir'
    },
});

export const dt_row_pagination = (table) => ({
    targets: 0,
    render: (data, type, row, meta) => {
        const page = table?.page.info().page;
        const length = table?.page.info().length;
        const index = (page * length) + meta?.row + 1;
        return index;
    }
});