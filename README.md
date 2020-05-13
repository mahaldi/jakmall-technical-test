# jakmall-technical-test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```
### Narasi
```
index halaman adalah /payment?step=1 , jika hanya / maka di direct ke halaman index. 
Selain halaman payment ada halaman /cart untuk melengkapi variable harga dan kuantiti barang yang di beli. 
di halaman cart anda dapat menambah atau mengurangi jumlah barang. 
lalu pada payment step 1 error handling mengikuti seperti yang ada pada contoh mockup yaitu tidak memunculkan tulisan error hanya merubah icon dan warna dari field form. 
pada step ke 2 saya menambahkan validasi tambahan jika menggunakan e wallet dan total harga melebihi e wallet, untuk itu silahkan menggunakan metode pembayaran yang lain. 
pada form ke 2 tidak ada pesan error juga dan sudah ada initial value yang di pilih. 
karena jika tidak ada initial value saya bingung bagaimakan menampilkan tulisan error yang proper tanpa perlu menampilkan tulisan error. 
pada step ke 3 akan ada order id yang mana di simpan pada browser. 
maka dari itu anda dapat melihat detail order id yang sebelumnya jika anda punya
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
