import type { TeamMember } from '../../types';
import { images } from '../../data/site';

export const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <article className="luxury-card overflow-hidden">
    <div className="aspect-[4/3] overflow-hidden bg-cream">
      <img
        src={member.portrait}
        alt={`${member.name}, ${member.role}`}
        width={520}
        height={390}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src = images.team.src;
        }}
        className="h-full w-full object-cover object-top transition duration-500 hover:scale-105"
      />
    </div>
    <div className="p-6 text-center">
      <h3 className="font-serif text-2xl font-medium text-ink">{member.name}</h3>
      <p className="mt-1 text-sm font-semibold text-ink/68">{member.role}</p>
      <p className="mt-4 text-sm leading-7 text-ink/64">{member.focus}</p>
    </div>
  </article>
);
