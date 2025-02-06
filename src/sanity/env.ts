export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-26'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skw0XxLfsuGMTRHBRDFBlFh17mGdFSVvD3qUAiaGvsvSdKKSQGFJIzH6gwqywo7o6JJpv9EnpcvkGrfOnCGrv3cYAcFFYY2zPxSxJPJO4Vx4Sqd52XxVx9bWcDyY8WRPuhfDsBMOHAom0tMBXbMG9kUsUczkxcIgP5s5stWQbAEsHb0y02pt",
  'Missing environment variable: SANITY_API_TOKEN '
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
