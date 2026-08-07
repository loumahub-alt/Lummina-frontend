import { Mail, MapPin, Phone } from 'lucide-react';
import { brand, offices } from '../../data/site';
import { trackEvent } from '../../utils/analytics';

export const ContactInformation = () => (
  <div className="space-y-8">
    {offices.map((office) => (
      <div key={office.name} className="grid grid-cols-[2rem_1fr] gap-5">
        <MapPin aria-hidden="true" className="mt-1 h-7 w-7 text-gold-bright" />
        <div>
          <h3 className="font-bold text-white">{office.name}</h3>
          <address className="mt-2 not-italic leading-7 text-muted">
            {office.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${brand.legalName}, ${office.address.join(', ')}, Nigeria`)}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-sm font-bold text-gold-bright hover:text-white"
          >
            View office on Google Maps
          </a>
          <a
            href={`tel:${office.phone.replace(/[^+\d]/g, '')}`}
            onClick={() => trackEvent('phone_tap', { location: office.name })}
            className="mt-1 block text-white"
          >
            {office.phone}
          </a>
          <a
            href={brand.whatsapp}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: office.name })}
            className="mt-1 block text-gold-bright hover:text-white"
          >
            Message us on WhatsApp
          </a>
        </div>
      </div>
    ))}
    <div className="grid grid-cols-[2rem_1fr] gap-5">
      <Mail aria-hidden="true" className="mt-1 h-7 w-7 text-gold-bright" />
      <div>
        <h3 className="font-bold text-white">Email</h3>
        <a href={`mailto:${brand.email}`} className="mt-2 block text-muted hover:text-gold-bright">
          {brand.email}
        </a>
      </div>
    </div>
    <div className="grid grid-cols-[2rem_1fr] gap-5">
      <Phone aria-hidden="true" className="mt-1 h-7 w-7 text-gold-bright" />
      <div>
        <h3 className="font-bold text-white">Office Hours</h3>
        <p className="mt-2 leading-7 text-muted">Monday to Friday, 8:30 AM to 6:00 PM</p>
      </div>
    </div>
  </div>
);
