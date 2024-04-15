import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { validate } from 'class-validator';
import { Country, CountryCreateInput } from '../Entities/Country';

@Resolver(Country)
export class CountryResolver {
  @Query(() => [Country])
  async allCountries(): Promise<Country[]> {
    const countries = await Country.find({ relations: { continent: true } });
    return countries;
  }

  @Query(() => Country, { nullable: true })
  async getCountry(@Arg('code') code: string): Promise<Country | null> {
    const country = await Country.findOne({
      where: { code: code },
      relations: { continent: true },
    });
    return country;
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
