type InformationLandingCardProps = {
  cardTitle: string;
  cardDescription: string;
  Icon: React.FC;
  iconBackgroundStyle: string;
};

export function InformationLandingCard({
  cardTitle,
  cardDescription,
  Icon,
  iconBackgroundStyle,
}: InformationLandingCardProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className={iconBackgroundStyle}>
        <Icon />
      </div>
      <h3 className="text-2xl font-medium text-gray-900">{cardTitle}</h3>
      <p className="mt-3 text-lg leading-relaxed text-gray-500">
        {cardDescription}
      </p>
    </div>
  );
}
