import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { validate } from 'class-validator';
import { Continent, ContinentCreateInput } from '../Entities/Continent';
import { Country } from '../Entities/Country';

@Resolver(Continent)
export class ContinentResolver {
  @Query(() => [Country])
  async getCountriesByContinent(@Arg('code') code: string): Promise<Country[]> {
    const continent = await Continent.findOne({
      where: { code: code },
      relations: ['countries'],
    });
    if (!continent) {
      throw new Error(`Continent with code ${code} not found`);
    }
    return continent.countries;
  }

  @Mutation(() => Continent)
  async createContinent(
    @Arg('data', () => ContinentCreateInput) data: ContinentCreateInput
  ): Promise<Continent> {
    const newContinent = new Continent();
    Object.assign(newContinent, data);

    const errors = await validate(newContinent);
    if (errors.length === 0) {
      await newContinent.save();
      return newContinent;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }
}
