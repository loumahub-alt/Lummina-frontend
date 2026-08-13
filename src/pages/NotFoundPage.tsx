import { images } from '../data/site';
import { PageHero } from '../components/common/PageHero';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SecondaryButton } from '../components/common/SecondaryButton';

export const NotFoundPage = () => (
  <>
    <PageHero
      eyebrow="404"
      title="That page could not be found."
      description="The address may have changed. Explore our legal services or speak with Lummina about the matter in front of you."
      image={images.columns}
    />
    <section className="cream-section py-16">
      <div className="container-shell flex flex-col justify-center gap-4 sm:flex-row">
        <PrimaryButton to="/practice-areas">
          Explore Practice Areas
        </PrimaryButton>
        <SecondaryButton to="/consultation" dark>
          Schedule a Consultation
        </SecondaryButton>
      </div>
    </section>
  </>
);
