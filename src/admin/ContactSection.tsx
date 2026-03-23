import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Mail, Save, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ContactInfo } from '../types';

const ContactSection: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [form, setForm] = useState<ContactInfo>(state.contactInfo);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(state.contactInfo);
  }, [state.contactInfo]);

  const handleChange = (field: keyof ContactInfo, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    dispatch({ type: 'UPDATE_CONTACT_INFO', payload: form });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const phoneHref = `tel:${form.phone.replace(/\s/g, '')}`;
  const whatsappHref = `https://wa.me/${form.whatsapp.replace(/[\s+]/g, '')}`;
  const mailHref = `mailto:${form.email}`;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Contatti del Poliambulatorio</h2>
        <p className="text-sm text-gray-500 mb-6">
          Modifica i contatti: i pulsanti "Chiama", "WhatsApp" ed "Email" su tutto il sito si aggiorneranno automaticamente.
        </p>

        <div className="space-y-6">
          {/* Telefono */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
              <Phone size={22} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Numero di Telefono
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Formato consigliato: <code>+39 0771 000 000</code> — usato per il link "Chiama ora"
              </p>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+39 0771 000 000"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 font-mono"
              />
              <p className="text-xs text-gray-400 mt-1">
                Link generato: <a href={phoneHref} className="text-blue-500 hover:underline">{phoneHref}</a>
              </p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
              <MessageCircle size={22} className="text-green-600" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Numero WhatsApp
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Formato consigliato: <code>+39 331 000 0000</code> — usato per il pulsante WhatsApp
              </p>
              <input
                type="tel"
                value={form.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                placeholder="+39 331 000 0000"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 font-mono"
              />
              <p className="text-xs text-gray-400 mt-1">
                Link generato: <a href={whatsappHref} className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">{whatsappHref}</a>
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
              <Mail size={22} className="text-teal-600" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Indirizzo Email
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Usata per il link "Invia Email" e mostrata nel footer
              </p>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="info@penitromed.it"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 font-mono"
              />
              <p className="text-xs text-gray-400 mt-1">
                Link generato: <a href={mailHref} className="text-teal-600 hover:underline">{mailHref}</a>
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
          >
            {saved ? <CheckCircle size={20} /> : <Save size={20} />}
            {saved ? 'Salvato!' : 'Salva modifiche'}
          </button>
          {saved && (
            <span className="text-sm text-green-600 font-medium">
              ✓ I link del sito sono stati aggiornati
            </span>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Anteprima link generati</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a
            href={phoneHref}
            className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <Phone size={20} className="text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-xs text-blue-400 font-medium">CHIAMA ORA</p>
              <p className="text-sm font-semibold text-blue-800">{form.phone}</p>
            </div>
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
          >
            <MessageCircle size={20} className="text-green-600 flex-shrink-0" />
            <div>
              <p className="text-xs text-green-400 font-medium">WHATSAPP</p>
              <p className="text-sm font-semibold text-green-800">{form.whatsapp}</p>
            </div>
          </a>
          <a
            href={mailHref}
            className="flex items-center gap-3 p-4 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors"
          >
            <Mail size={20} className="text-teal-600 flex-shrink-0" />
            <div>
              <p className="text-xs text-teal-400 font-medium">INVIA EMAIL</p>
              <p className="text-sm font-semibold text-teal-800">{form.email}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
