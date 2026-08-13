import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { offices } from '../../data/site';
import { usePublicContact } from '../../hooks/usePublishedContent';
import { trackEvent } from '../../utils/analytics';

export const ContactInformation = () => {
  const contact = usePublicContact();
  const office = {
    ...offices[0],
    phones: contact.phones,
    address: contact.address,
    mapUrl: contact.mapUrl,
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-[2rem_1fr] gap-5">
        <Phone aria-hidden="true" className="mt-1 h-7 w-7 text-gold-bright" />
        <div>
          <h3 className="font-bold text-white">Call</h3>
          {office.phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/[^+\d]/g, '')}`}
              onClick={() => trackEvent('phone_tap', { location: office.name })}
              className="mt-2 block text-white"
            >
              {phone}
            </a>
          ))}
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: office.name })}
            className="mt-2 inline-flex items-center gap-2 text-gold-bright hover:text-white"
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            <span>Message us on WhatsApp</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-[2rem_1fr] gap-5">
        <Mail aria-hidden="true" className="mt-1 h-7 w-7 text-gold-bright" />
        <div>
          <h3 className="font-bold text-white">Email</h3>
          <a href={'mailto:' + contact.email} className="mt-2 block text-muted hover:text-gold-bright">
            {contact.email}
          </a>
        </div>
      </div>

      <div className="grid grid-cols-[2rem_1fr] gap-5">
        <MapPin aria-hidden="true" className="mt-1 h-7 w-7 text-gold-bright" />
        <div>
          <h3 className="font-bold text-white">Location</h3>
          <address className="mt-2 not-italic leading-7 text-muted">
            <a href={office.mapUrl} target="_blank" rel="noreferrer" className="hover:text-white">
              {office.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </a>
          </address>
          <div
            className="relative mt-4 h-40 overflow-hidden rounded-[2px] border border-champagne/20 bg-[#310013]"
            aria-label="Map preview showing Lummina Law Firm at The Providence Street, Lekki Phase 1"
          >
            <div aria-hidden="true" className="absolute inset-0 opacity-80">
              <div className="absolute -left-[10%] top-[58%] h-2 w-[120%] rotate-[-14deg] bg-champagne/10" />
              <div className="absolute left-[35%] top-[-30%] h-[160%] w-2 rotate-[34deg] bg-gold/10" />
              <div className="absolute left-[22%] top-[70%] h-px w-[85%] rotate-[26deg] bg-champagne/20" />
              <div className="absolute left-[58%] top-[-20%] h-[150%] w-px rotate-[25deg] bg-champagne/15" />
              <div className="absolute inset-x-0 top-[34%] h-px bg-champagne/10" />
              <div className="absolute inset-y-0 left-[23%] w-px bg-champagne/10" />
            </div>
            <span className="absolute left-[8%] top-[18%] text-[0.55rem] font-bold uppercase tracking-[0.12em] text-champagne/45">
              Lekki Phase 1
            </span>
            <span className="absolute bottom-[17%] left-[9%] text-[0.55rem] font-bold uppercase tracking-[0.12em] text-champagne/45">
              Lagos State
            </span>
            <span className="absolute right-[8%] top-[20%] text-[0.55rem] font-bold uppercase tracking-[0.12em] text-champagne/45">
              The Providence Street
            </span>
            <a
              href={office.mapUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Lummina Law Firm location in Google Maps"
              className="absolute left-[58%] top-[48%] -translate-x-1/2 -translate-y-1/2 text-gold-bright transition hover:text-white"
            >
              <MapPin aria-hidden="true" className="h-9 w-9 fill-gold-bright" />
            </a>
            <span className="absolute bottom-[10%] right-[8%] rounded-[2px] bg-wine/80 px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.1em] text-gold-bright">
              Lummina Law Firm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
