import React, { useState, useEffect } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import './Home.css';

const InfoCuaca: React.FC = () => {
  const [namaKota, setNamaKota] = useState<string>('Manado');
  const [dataCuaca, setDataCuaca] = useState<any>(null);
  const [indeksUV, setIndeksUV] = useState<number | null>(null);
  const [ikonCuaca, setIkonCuaca] = useState<string>('');

  const kunciAPI = '05f0dcd8d3b90d732a3d8d2b3bcaa179';

  const ambilCuaca = async () => {
    if (!namaKota) return;

    try {
      const respon = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${namaKota}&units=metric&appid=${kunciAPI}&lang=id`);
      const hasil = await respon.json();
      setDataCuaca(hasil);
      setIkonCuaca(`http://openweathermap.org/img/w/${hasil.weather[0].icon}.png`);

      const responUV = await fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${hasil.coord.lat}&lon=${hasil.coord.lon}&appid=${kunciAPI}`);
      const dataUV = await responUV.json();
      setIndeksUV(dataUV.value);
    } catch (kesalahan) {
      console.error('Gagal mengambil data cuaca:', kesalahan);
    }
  };

  useEffect(() => {
    ambilCuaca();
  }, []);

  return (
    <>
      <IonContent>
        <div>
          {dataCuaca && (
            <IonCard>
              <IonCardContent>
                <div className="kontainer-input">
                  <IonInput value={namaKota} placeholder="Masukkan nama kota" onIonChange={(e) => setNamaKota(e.detail.value!)} clearInput class="input-kota"></IonInput>
                  <IonButton expand="full" onClick={ambilCuaca}>
                    Cari
                  </IonButton>
                </div>
              </IonCardContent>

              <IonCardHeader>
                <IonCardTitle className="judul-kota">Cuaca Kota {namaKota}</IonCardTitle>
              </IonCardHeader>
              <br />
              <IonCardTitle className="suhu">{Math.round(dataCuaca.main.temp)}°C</IonCardTitle>
              <img src={`https://openweathermap.org/img/wn/${dataCuaca.weather[0].icon}@2x.png`} alt="Ikon Cuaca" />
              <h2 className="deskripsi">{dataCuaca.weather[0].description}</h2>
              <IonCardContent>
                <div className="detail-cuaca">
                  <div className="box-cuaca">
                    <p>Kecepatan Angin</p>
                    <p className="nilai">{dataCuaca.wind.speed} m/s</p>
                  </div>
                  <div className="box-cuaca">
                    <p>Kelembaban</p>
                    <p className="nilai">{dataCuaca.main.humidity}%</p>
                  </div>
                  <div className="box-cuaca">
                    <p>Tekanan Udara</p>
                    <p className="nilai">{dataCuaca.main.pressure} hPa</p>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          )}
        </div>
      </IonContent>
    </>
  );
};

export default InfoCuaca;
