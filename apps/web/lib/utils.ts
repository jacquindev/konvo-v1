import * as ct from "countries-and-timezones";

type CountryFromTimezone = {
  code: string | undefined;
  name: string | undefined;
};

export function getCountryFromTimezone(
  timezone?: string
): CountryFromTimezone | null {
  if (!timezone) return null;

  const timezoneInfo = ct.getTimezone(timezone);

  if (!timezoneInfo?.countries?.length) return null;

  const countryCode = timezoneInfo.countries[0];
  const country = ct.getCountry(countryCode as string);

  return {
    code: countryCode,
    name: country?.name || countryCode,
  };
}

export function getCountryFlagUrl(countryCode: string): string {
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
}
