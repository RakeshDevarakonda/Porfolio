interface SectionHeadingProps {
  index: string
  title: string
  description?: string
}

export function SectionHeading({ index, title, description }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <span className="section-index">{index}</span>
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  )
}
