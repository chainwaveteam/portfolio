import { FixedObject, FluidObject } from 'gatsby-image'

// Specifics types

export type ContainerSize = 'blog' | 'container' | 'full'
export type SlicesTypes = 'text' | 'quote' | 'code' | 'image_with_caption'
export type ServicesStatus = 'default' | 'soon' | 'hide' | 'new'

// Prismic Atomic types

export interface PrismicLink {
  link_type: string
  url: string
  target?: string
}

export interface PrismicText {
  text?: string
  html?: string
}

export interface PrismicTextAndRaw extends PrismicText {
  raw?: {
    label?: string
  }
}

export interface PrismicTechTag {
  uid: string
  data: {
    title?: PrismicText
    description?: PrismicText
  }
}

export interface PrismicTechTagRelation {
  tech_tags: {
    uid: string
    document: PrismicTechTag[]
  }
}

interface PrismicTechTagQuery {
  edges: Array<{
    node: PrismicTechTag
  }>
}

export interface PrismicImage {
  alt?: string
  url?: string
  localFile?: {
    childImageSharp: {
      fluid?: FluidObject
      fixed?: FixedObject
    }
  }
}

// Slices Types

export interface PrismicSliceText {
  text?: PrismicText
}

export interface PrismicSliceQuote {
  quote?: PrismicText
  source_name?: string
  source_link?: PrismicLink
}

export interface PrismicSliceCode {
  code?: PrismicTextAndRaw
}

export interface PrismicSliceImageWithCaption {
  image?: PrismicImage
  caption?: string
}

export type SliceContent =
  | PrismicSliceText
  | PrismicSliceQuote
  | PrismicSliceCode
  | PrismicSliceImageWithCaption

export interface Slice {
  slice_type: SlicesTypes
  slice_label?: ContainerSize
  primary?: SliceContent
}

export interface PostCanonical {
  uid: string
  document: Array<{
    data: {
      title?: PrismicText
    }
  }>
}

// Posts Types

export interface PrismicPost {
  uid: string
  last_publication_date: string
  first_publication_date: string
  data: {
    title: PrismicText
    thumbnail?: PrismicImage
    canonical?: PostCanonical
    published_date?: string
    relations?: PrismicTechTagRelation[]
    body?: Slice[] // Slices
  }
}

export interface PrismicPostQuery {
  edges: Array<{ node: PrismicPost }>
}

export interface PrismicProject {
  uid: string
  data: {
    title: PrismicText
    isfeatured?: 'yes' | 'no'
    demo_link?: PrismicLink
    source_link?: PrismicLink
    full_screen?: PrismicImage
    html?: PrismicText
    project_type?: {
      document: Array<{ data: { title: PrismicText } }>
    }
    relations?: PrismicTechTagRelation[]
  }
}

export type ProjectList = Array<{ node: PrismicProject }>

export interface Homepage {
  type: string
  data: {
    header_contact_button_label: string
    title: PrismicText
    introduction: PrismicText
    services_introduction: PrismicText
    services: Array<{
      status: ServicesStatus
      service_title: string
      service_textarea: PrismicText
    }>
  }
}

// Pages & Templates types

// export interface Page {}

export interface Template {
  location: Location
  pageContext: any
}

export interface ForTemplatePostTag extends PrismicTechTag {
  count: number
  posts: string[]
}

export interface TemplatePost extends Template {
  pageContext: {
    currentPost: PrismicPost
    allPosts: Array<{
      node: PrismicPost
    }>
    postTags: Array<{
      node: ForTemplatePostTag
    }>
  }
}

export interface TemplatePostTag extends Template {
  pageContext: {
    currentTag: ForTemplatePostTag
    posts: Array<{
      node: PrismicPost
    }>
    postTags: Array<{
      node: ForTemplatePostTag
    }>
  }
}

export interface TemplateBlog extends Template {
  pageContext: {
    posts: Array<{
      node: PrismicPost
    }>
    postTags: Array<{
      node: ForTemplatePostTag
    }>
  }
}

export interface TemplateHome extends Template {
  pageContext: {
    lastPosts: Array<{
      node: PrismicPost
    }>
    projects: ProjectList
    homepage: Homepage
  }
}
