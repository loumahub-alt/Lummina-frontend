import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { brand, footerColumns, legalLinks, offices } from '../../data/site';
import { usePublicContact } from '../../hooks/usePublishedContent';
import { Logo } from '../common/Logo';
import { TransitionLink } from '../transitions';
import { trackEvent } from '../../utils/analytics';

export const Footer = () => {
  const contact = usePublicContact();
  const socialLinks = [
    { label: 'Facebook', href: contact.social.facebook, icon: Facebook },
    { label: 'X', href: contact.social.x, icon: Twitter },
    { label: 'LinkedIn', href: contact.social.linkedin, icon: Linkedin },
    { label: 'Instagram', href: contact.social.instagram, icon: Instagram },
  ].filter((item) => item.href);
  const contactOffice = {
    ...offices[0],
    phones: contact.phones,
    address: contact.address,
    mapUrl: contact.mapUrl,
  };

  return (
  <footer id="contact" className="border-t border-dark-line luxury-dark text-white">
    <div className="container-shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.35fr_1fr_1.25fr]">
      <div>
        <Logo compact />
        <p className="mt-7 max-w-xs leading-7 text-muted">{brand.statement}</p>
        <div className="mt-7 flex items-center gap-3">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-dark-line text-white/78 transition hover:border-gold hover:text-gold-bright"
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>

      {footerColumns.map((column) => (
        <div key={column.title}>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.12em] text-white">
            {column.title}
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            {column.links.map((link) => (
              <li key={link.label}>
                <TransitionLink to={link.to} className="transition hover:text-gold-bright">
                  {link.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div>
        <h2 className="text-xs font-extrabold uppercase tracking-[0.12em] text-white">Contact</h2>
        <div className="mt-5 space-y-5 text-sm leading-7 text-muted">
          <p className="font-bold text-white">{brand.legalName}</p>
          {[contactOffice].map((office) => (
            <div key={office.name}>
              <p className="font-bold text-gold-bright">{office.name}</p>
              <a href={office.mapUrl} target="_blank" rel="noreferrer" className="block hover:text-white">
                <address className="not-italic leading-6">{office.address.join(', ')}</address>
              </a>
              {office.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                  onClick={() => trackEvent('phone_tap', { location: office.name, source: 'footer' })}
                  className="block hover:text-white"
                >
                  {phone}
                </a>
              ))}
            </div>
          ))}
          <a href={'mailto:' + contact.email} className="block text-gold-bright hover:text-white">
            {contact.email}
          </a>
        </div>
      </div>
    </div>

    <div className="border-t border-dark-line">
      <div className="container-shell flex flex-col gap-5 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>{brand.copyright}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {legalLinks.map((link) => (
            <TransitionLink key={link.label} to={link.to} className="hover:text-gold-bright">
              {link.label}
            </TransitionLink>
          ))}
        </div>
      </div>
    </div>
  </footer>
  );
};
