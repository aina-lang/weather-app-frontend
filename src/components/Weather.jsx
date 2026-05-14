import React, { useState, useEffect } from 'react';
import { Search, Wind, Droplets, Sun, CloudRain, Thermometer, MapPin, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useWeather } from '../hooks/useWeather';

const Weather = () => {
  const [city, setCity] = useState('');
  const { data, loading, error, fetchWeather } = useWeather();

  useEffect(() => {
    // Initial fetch, could be based on GeoIP from backend
    fetchWeather().then(res => {
      if (res && res.city) {
        setCity(res.city);
      }
    }).catch(() => {});
  }, [fetchWeather]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city, 'weather');
  };

  const toggleOption = () => {
    const newOption = data?.type === 'weather' ? 'forecast' : 'weather';
    fetchWeather(city, newOption);
  };

  return (
    <div className="space-y-10">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
          <Search size={20} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          className="w-full bg-white border border-slate-200 rounded-2xl pl-14 pr-36 py-4 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-sm"
          placeholder="Rechercher une ville..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button 
          type="submit" 
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-6 rounded-xl transition-colors cursor-pointer shadow-sm"
        >
          Chercher
        </button>
      </form>

      {error && (
        <div className="flex items-center justify-center gap-2 bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-medium animate-in slide-in-from-top-2 duration-300">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-blue-600" size={40} strokeWidth={2.5} />
          <p className="text-sm font-medium text-slate-400 animate-pulse">Récupération des données...</p>
        </div>
      )}

      {data && !loading && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Main Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-sm">
            <div className="absolute -top-10 -right-10 p-8 text-slate-50">
               <Sun size={200} strokeWidth={1} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <div className="flex items-center gap-2 text-blue-600 mb-3 bg-blue-50 w-fit px-3 py-1 rounded-full border border-blue-100">
                  <MapPin size={14} strokeWidth={2.5} />
                  <span className="text-xs font-bold uppercase tracking-wider">{data.city}</span>
                </div>
                <h2 className="text-6xl font-extrabold text-slate-900 tracking-tighter">
                  {data.type === 'weather' ? `${Math.round(data.data.temperature)}°` : 'Prévisions'}
                </h2>
                <p className="text-lg font-medium text-slate-500 mt-2 capitalize">
                  {data.type === 'weather' ? data.data.description : 'Météo sur 5 jours'}
                </p>
              </div>

              <button 
                onClick={toggleOption} 
                className="group flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-6 py-3 rounded-xl text-sm font-bold text-slate-700 transition-all cursor-pointer"
              >
                <Calendar size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                Voir les {data.type === 'weather' ? 'prévisions' : 'conditions actuelles'}
              </button>
            </div>

            {data.type === 'weather' && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 relative z-10">
                <WeatherDetail icon={<Wind size={20} />} label="Vent" value={`${data.data.wind_speed} km/h`} />
                <WeatherDetail icon={<Droplets size={20} />} label="Humidité" value={`${data.data.humidity}%`} />
                <WeatherDetail icon={<Thermometer size={20} />} label="Ressenti" value={`${Math.round(data.data.feels_like)}°`} />
                <WeatherDetail icon={<Sun size={20} />} label="Indice UV" value={data.data.uv_index} />
              </div>
            )}
          </div>

          {/* Forecast Grid */}
          {data.type === 'forecast' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {data.data.map((day, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl text-center hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    {format(new Date(day.date), 'EEE d MMM', { locale: fr })}
                  </p>
                  <div className="text-blue-600 mb-4 flex justify-center bg-blue-50 w-12 h-12 items-center mx-auto rounded-xl">
                    <CloudRain size={24} strokeWidth={2.5} />
                  </div>
                  <p className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">{Math.round(day.temp_max)}°</p>
                  <p className="text-xs font-semibold text-slate-500 capitalize">{day.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* HA Info */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Serveur: <span className="text-slate-600">{data.server_info.node_name}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 border-l border-slate-200 pl-8">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Instance: <span className="text-slate-600">{data.server_info.pod_name}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const WeatherDetail = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-blue-100 hover:bg-white hover:shadow-sm transition-all duration-300">
    <div className="text-blue-600 bg-white p-2.5 rounded-xl shadow-sm border border-slate-100">{icon}</div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{label}</p>
      <p className="text-lg font-extrabold text-slate-900">{value}</p>
    </div>
  </div>
);

export default Weather;

