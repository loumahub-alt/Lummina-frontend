import { CallToAction } from '../components/common/CallToAction';
import { PageHero } from '../components/common/PageHero';
import { images } from '../data/site';

type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
};

const LegalPage = ({ eyebrow, title, description, sections }: LegalPageProps) => (
  <>
    <PageHero eyebrow={eyebrow} title={title} description={description} image={images.library} />
    <section className="cream-section py-16 sm:py-20">
      <div className="container-shell max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-gold-dark">
          Last updated: 26 August 2026
        </p>
        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                {section.title}
              </h2>
              {section.paragraphs && (
                <div className="mt-4 space-y-4 leading-8 text-ink/72">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              )}
              {section.bullets && (
                <ul className="mt-4 list-disc space-y-3 pl-6 leading-8 text-ink/72">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
    <CallToAction />
  </>
);

export const PrivacyPolicyPage = () => (
  <LegalPage
    eyebrow="Privacy Policy"
    title="How Lummina handles personal data."
    description="This Privacy Policy explains how Lummina Law Firm collects, uses, discloses and safeguards personal data when you interact with the website or the firm."
    sections={[
      {
        title: '1. Introduction',
        paragraphs: [
          'Lummina Law Firm ("Lummina," "we," "us," or "our") is a commercial law firm based in Plot 5, The Providence Street, Lekki Phase 1, Lagos State, Nigeria. We are committed to protecting the privacy and personal data of everyone who visits our website, engages our services, or otherwise interacts with us.',
          'This Privacy Policy explains how we collect, use, disclose, and safeguard personal data in accordance with the Nigeria Data Protection Act, 2023 ("NDPA") and the applicable regulations and guidance issued by the Nigeria Data Protection Commission ("NDPC"). By using our website, you acknowledge that you have read and understood this Policy.',
        ],
      },
      {
        title: '2. Who We Are',
        paragraphs: [
          'Lummina Law Firm is the data controller responsible for personal data processed through this website.',
          'Address: Plot 5, The Providence Street, Lekki Phase 1, Lagos State, Nigeria',
          'Email: info@lumminalaw.com',
        ],
      },
      {
        title: '3. Scope of This Policy',
        paragraphs: [
          'This Policy applies to personal data collected through our website, including when you fill out a contact or intake form, subscribe to updates, request a consultation, or otherwise communicate with us electronically. It does not govern personal data we process as part of an active client engagement, which is instead governed by the applicable engagement letter and our internal client confidentiality obligations.',
        ],
      },
      {
        title: '4. Personal Data We Collect',
        paragraphs: ['Depending on how you interact with our website, we may collect:'],
        bullets: [
          'Identity data: full name, title, and organisation.',
          'Contact data: email address, phone number, and postal or business address.',
          'Enquiry data: details you provide in a contact form, intake form, or consultation request, including the nature of your legal matter.',
          'Technical data: IP address, browser type and version, device information, and general location derived from your IP address.',
          'Usage data: information on how you use our website, including pages visited and time spent, collected via cookies or similar technologies.',
          'Marketing data: your preferences in relation to receiving newsletters, alerts, or other communications from us.',
        ],
      },
      {
        title: '5. How We Collect Your Data',
        paragraphs: [
          'We collect personal data directly from you when you interact with our website, for example by submitting a form; automatically as you navigate the site, via cookies and similar technologies; and, occasionally, from third parties such as referral partners, where you have consented to that referral.',
        ],
      },
      {
        title: '6. Legal Basis for Processing',
        paragraphs: ['We rely on one or more of the following lawful bases recognised under the NDPA to process your personal data:'],
        bullets: [
          'Consent — where you have given clear consent, such as by submitting an enquiry or subscribing to communications.',
          'Contract — where processing is necessary to take steps at your request prior to entering into an engagement, or to perform an engagement with you.',
          'Legal obligation — where processing is necessary for us to comply with a legal or regulatory obligation, including anti-money laundering and know-your-client requirements.',
          'Legitimate interests — where processing is necessary for our legitimate interests in operating and improving our practice, provided this is not overridden by your rights and interests.',
        ],
      },
      {
        title: '7. How We Use Your Data',
        paragraphs: ['We use personal data collected through our website to:'],
        bullets: [
          'Respond to enquiries and consultation requests.',
          'Assess potential conflicts of interest before accepting a new matter.',
          'Provide, manage, and communicate about our legal services.',
          'Send updates, newsletters, or thought leadership content, where you have opted in.',
          'Maintain and improve the security, functionality, and performance of our website.',
          'Comply with applicable legal, regulatory, and professional obligations.',
        ],
      },
      {
        title: '8. Data Sharing and Disclosure',
        paragraphs: ['We do not sell personal data. We may share personal data with:'],
        bullets: [
          'Members of our legal and administrative team on a need-to-know basis.',
          'Service providers who support our operations, such as IT hosting, email, and practice management providers, under appropriate confidentiality and data processing terms.',
          'Regulators, courts, or other authorities, where required by law or professional obligation.',
          'Co-counsel or other advisers engaged on a matter, where necessary and, where appropriate, with your knowledge.',
        ],
      },
      {
        title: '9. International Data Transfers',
        paragraphs: [
          'Where personal data is transferred outside Nigeria — for example, to a cloud service provider with servers in another country — we take steps to ensure the transfer complies with the NDPA, including verifying that the recipient jurisdiction offers an adequate level of protection or that appropriate safeguards, such as contractual clauses, are in place.',
        ],
      },
      {
        title: '10. Data Retention',
        paragraphs: [
          'We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, including to satisfy any legal, regulatory, accounting, or reporting requirements.',
          'Enquiry data from individuals who do not become clients is ordinarily retained only for as long as needed to assess the enquiry, complete conflict checks, maintain appropriate records and comply with legal or professional obligations. It is then securely deleted or anonymised where appropriate, unless a longer period is required by law.',
        ],
      },
      {
        title: '11. Data Security',
        paragraphs: [
          'We implement appropriate technical and organisational measures to protect personal data against unauthorised access, alteration, disclosure, or destruction, including access controls, secure storage, and staff confidentiality obligations. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
        ],
      },
      {
        title: '12. Your Rights Under the NDPA',
        paragraphs: ['Subject to applicable exceptions, you have the right to:'],
        bullets: [
          'Be informed about how your personal data is processed.',
          'Access the personal data we hold about you.',
          'Request correction of inaccurate or incomplete personal data.',
          'Request deletion of your personal data, where applicable.',
          'Object to or restrict certain processing, including direct marketing.',
          'Withdraw consent at any time, where processing is based on consent.',
          'Lodge a complaint with the Nigeria Data Protection Commission (NDPC).',
        ],
      },
      {
        title: '13. Cookies and Tracking Technologies',
        paragraphs: [
          'Our website may use cookies and similar technologies to distinguish you from other users, remember your preferences, and understand how the site is used. Essential browser storage may be used to remember your analytics choice and support basic site functionality. Optional analytics are disabled unless you choose to allow them through the consent banner.',
          'You can set your browser to refuse cookies or clear local browser storage, though some parts of the website may not function properly as a result. You can also continue using the website without allowing optional analytics.',
        ],
      },
      {
        title: "14. Children's Privacy",
        paragraphs: [
          'Our website is not directed at children, and we do not knowingly collect personal data from anyone under the age of 18. If we become aware that we have inadvertently collected such data, we will take steps to delete it.',
        ],
      },
      {
        title: '15. Third-Party Links',
        paragraphs: [
          'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites and encourage you to review their privacy policies independently.',
        ],
      },
      {
        title: '16. Changes to This Policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The updated version will be indicated by a revised “Last updated” date, and we encourage you to review this Policy periodically.',
        ],
      },
      {
        title: '17. Contact Us',
        paragraphs: [
          'If you have questions about this Privacy Policy, wish to exercise your rights, or wish to raise a concern, please contact us at:',
          'Lummina Law Firm, Plot 5, The Providence Street, Lekki Phase 1, Lagos State, Nigeria',
          'Email: info@lumminalaw.com',
          'Telephone: 07060469068',
        ],
      },
    ]}
  />
);

export const TermsOfUsePage = () => (
  <LegalPage
    eyebrow="Terms of Use"
    title="The terms that govern use of this website."
    description="These Terms of Use govern your access to and use of the Lummina Law Firm website and its published information."
    sections={[
      {
        title: '1. Acceptance of These Terms',
        paragraphs: [
          'These Terms of Use ("Terms") govern your access to and use of the Lummina Law Firm website (the "Site"), operated by Lummina Law Firm ("Lummina," "we," "us," or "our"), a commercial law firm based in Plot 5, The Providence Street, Lekki Phase 1, Lagos State, Nigeria. By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.',
        ],
      },
      {
        title: '2. About Lummina Law Firm',
        paragraphs: [
          'Lummina Law Firm provides commercial legal services, including corporate and commercial advisory, trade finance and lending, company secretarial services, regulatory and licensing advisory, and related practice areas. Information on the Site describes our services generally and does not constitute an offer to provide services to any specific person or entity.',
        ],
      },
      {
        title: '3. No Attorney-Client Relationship; Not Legal Advice',
        paragraphs: [
          'The content on this Site is provided for general informational purposes only and does not constitute legal advice. Viewing or using this Site, or submitting an enquiry through it, does not create an attorney-client relationship between you and Lummina Law Firm. An attorney-client relationship is formed only upon our express written agreement to act for you, typically through a signed engagement letter.',
          'You should not act, or refrain from acting, on the basis of any content on this Site without first seeking appropriate legal advice on the particular facts and circumstances of your matter.',
        ],
      },
      {
        title: '4. Confidentiality of Communications',
        paragraphs: [
          'Please do not send confidential or sensitive information to us through the Site’s contact or enquiry forms until we have confirmed that we are able to act for you and have agreed on a secure method of communication. Until an engagement is formally established, information you submit through the Site is not subject to attorney-client privilege.',
        ],
      },
      {
        title: '5. Permitted Use of the Site',
        paragraphs: ['You may access and use the Site for lawful, personal, and informational purposes. You agree not to:'],
        bullets: [
          'Use the Site in any way that violates applicable law or regulation.',
          'Attempt to gain unauthorised access to the Site, our systems, or any client portal.',
          'Introduce viruses, malware, or other harmful code to the Site.',
          'Scrape, harvest, or otherwise systematically extract content or data from the Site without our prior written consent.',
          'Misrepresent your identity or affiliation when submitting an enquiry.',
        ],
      },
      {
        title: '6. Client Portal',
        paragraphs: [
          'Where we provide clients with access to a secure client portal, access is governed by these Terms together with any separate portal access terms and the applicable engagement letter. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.',
        ],
      },
      {
        title: '7. Intellectual Property',
        paragraphs: [
          'All content on the Site, including text, graphics, logos, the Lummina Law Firm name and branding, and the overall look and feel of the Site, is owned by or licensed to Lummina Law Firm and is protected by applicable intellectual property laws. You may view and print content from the Site for personal, non-commercial reference only. No other use, including reproduction, distribution, modification, or republication, is permitted without our prior written consent.',
        ],
      },
      {
        title: '8. Third-Party Links',
        paragraphs: [
          'The Site may contain links to third-party websites for your convenience. We do not endorse and are not responsible for the content, accuracy, or practices of any linked third-party website.',
        ],
      },
      {
        title: '9. Disclaimer of Warranties',
        paragraphs: [
          'The Site is provided on an “as is” and “as available” basis. To the fullest extent permitted by law, we make no warranties, express or implied, regarding the accuracy, completeness, reliability, or availability of the Site or its content, and disclaim all implied warranties, including fitness for a particular purpose.',
        ],
      },
      {
        title: '10. Limitation of Liability',
        paragraphs: [
          '10.1 Basis of use. The Site and its content are made available for general informational purposes only, on the basis set out in Section 3 above. You access and use the Site entirely at your own risk, and this Section 10 governs liability arising from that access and use. It does not govern liability arising from a formal client engagement, which is instead governed exclusively by the applicable engagement letter and the terms agreed in that engagement.',
          '10.2 Exclusion of indirect and consequential loss. To the fullest extent permitted by applicable law, in no event shall Lummina Law Firm, its partners, employees, consultants, or agents (together, the “Firm Parties”) be liable to you or any third party for any indirect, incidental, special, consequential, exemplary, or punitive damages of any kind, including without limitation loss of profits, revenue, business, anticipated savings, goodwill, reputation, or data, or business interruption, arising out of or in connection with the Site, whether such liability arises in contract, tort (including negligence), breach of statutory duty, or otherwise, and whether or not the Firm Parties have been advised of the possibility of such loss or damage, and even if a remedy set out in these Terms is found to have failed of its essential purpose.',
          '10.3 Exclusion of direct loss beyond the cap. Subject to Section 10.6, the aggregate liability of the Firm Parties for all direct losses, damages, costs, or expenses arising out of or in connection with your use of the Site, whether in contract, tort, or otherwise, shall not exceed the sum of the most recent professional fee you paid to the Firm, regardless of the number of claims or the theory of liability asserted.',
          '10.4 No warranty of accuracy. Without limiting the foregoing, the Firm Parties shall have no liability for any loss or damage arising from your reliance on any content published on the Site, including any error, omission, or inaccuracy in that content, or from any decision made or action taken on the basis of it, given that such content does not constitute legal advice and is not tailored to your specific circumstances.',
          '10.5 No liability for availability, security, or third parties. The Firm Parties shall have no liability for any loss or damage arising from: (a) unavailability, interruption, or suspension of the Site; (b) any error, defect, virus, or other harmful component transmitted to or through the Site by a third party; (c) unauthorised access to or alteration of your transmissions or data, except to the extent caused by the Firm’s own breach of its data protection obligations under applicable law; or (d) the content, policies, or practices of any third-party website linked from the Site.',
          '10.6 Carve-outs. Nothing in these Terms excludes or limits liability for any matter for which it would be unlawful to exclude or limit liability under the laws of the Federal Republic of Nigeria.',
          '10.7 Time bar. Any claim arising out of or in connection with your use of the Site must be brought within six (6) months of the date on which the cause of action first arose, failing which the claim shall be permanently barred, to the extent permitted by applicable law.',
          '10.8 Allocation of risk. You acknowledge that the exclusions and limitations in this Section 10 are a fair and reasonable allocation of risk between you and the Firm Parties given the informational, non-transactional nature of the Site, and that the Firm Parties would not make the Site available on any other basis.',
        ],
      },
      {
        title: '11. Indemnification',
        paragraphs: [
          'You agree to indemnify and hold harmless Lummina Law Firm, its partners, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of your misuse of the Site or your violation of these Terms.',
        ],
      },
      {
        title: '12. Governing Law and Jurisdiction',
        paragraphs: [
          'These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. You agree that the courts of Nigeria shall have exclusive jurisdiction to settle any dispute arising out of or in connection with these Terms or your use of the Site.',
        ],
      },
      {
        title: '13. Changes to These Terms',
        paragraphs: [
          'We may revise these Terms from time to time. The updated version will be indicated by a revised “Last updated” date. Your continued use of the Site after any changes take effect constitutes your acceptance of the revised Terms.',
        ],
      },
      {
        title: '14. Severability',
        paragraphs: [
          'If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions will continue in full force and effect.',
        ],
      },
      {
        title: '15. Contact Us',
        paragraphs: [
          'If you have questions about these Terms, please contact us at:',
          'Lummina Law Firm, Plot 5, The Providence Street, Lekki Phase 1, Lagos State, Nigeria',
          'Email: info@lumminalaw.com',
        ],
      },
    ]}
  />
);

export const ProfessionalNoticePage = () => (
  <LegalPage
    eyebrow="Professional Notice"
    title="Important context for website visitors."
    description="Please read this notice alongside the information published throughout the Lummina Law Firm website."
    sections={[
      {
        title: 'General information only',
        paragraphs: [
          'This website provides general information about Lummina Law Firm and its areas of work. It is not legal advice, does not address the facts of a particular matter and should not be treated as a promise of what the firm can achieve in any specific case.',
        ],
      },
      {
        title: 'No lawyer-client relationship',
        paragraphs: [
          'A website visit, email, social-media interaction or consultation request does not by itself create a lawyer-client relationship. Please avoid sending confidential information until conflicts, availability, scope and engagement terms have been confirmed by the firm.',
        ],
      },
      {
        title: 'Representative matters',
        paragraphs: [
          'Descriptions of representative matters are provided for context and are necessarily limited by confidentiality and professional obligations. They are not a success rate, a comparison with another lawyer or a promise, guarantee or prediction of a particular result. Every matter depends on its own facts, law, evidence, forum and opposing parties.',
        ],
      },
      {
        title: 'Jurisdiction and professional responsibility',
        paragraphs: [
          'The services that Lummina can provide depend on the applicable law, jurisdiction, professional authorisation and the terms of the engagement. Website content is intended for a Nigerian law-firm audience and may not be appropriate for use in another jurisdiction without qualified local advice.',
          'Public information about legal services is presented with regard to applicable professional responsibilities. The firm may revise or withdraw content when a professional, confidentiality or regulatory review requires it.',
        ],
      },
    ]}
  />
);
