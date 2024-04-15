import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { validate } from 'class-validator';
import { Country, CountryCreateInput } from '../Entities/Country';

@Resolver(Country)
export class CountryResolver {
  @Query(() => [Country])
  async allCountries(): Promise<Country[]> {
    const countries = await Country.find();
    return countries;
  }

  @Query(() => Country, { nullable: true })
  async getCountry(@Arg('code') code: string): Promise<Country | null> {
    const country = await Country.findOne({
      where: { code: code },
    });
    return country;
  }

  @Query(() => [Country], { nullable: true })
  async getCountriesByContinent(
    @Arg('continent') continent: string
  ): Promise<Country[] | null> {
    const countries = await Country.find({
      where: { continent: continent },
    });
    return countries;
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg('data', () => CountryCreateInput) data: CountryCreateInput
  ): Promise<Country> {
    const newCountry = new Country();
    Object.assign(newCountry, data);

    const errors = await validate(newCountry);
    if (errors.length === 0) {
      await newCountry.save();
      return newCountry;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }
}
