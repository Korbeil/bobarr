import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';

import { DownloadableMediaState } from 'src/app.dto';

import { TVShow } from './tvshow.entity';
import { TVEpisode } from './tvepisode.entity';
import { formatNumber } from 'src/utils/format-number';

@Entity()
@Unique(['seasonNumber', 'tvShow'])
export class TVSeason {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column('int')
  public seasonNumber!: number;

  @Column('varchar', { default: DownloadableMediaState.MISSING })
  public state: DownloadableMediaState = DownloadableMediaState.MISSING;

  @ManyToOne((_type) => TVShow, (tvshow) => tvshow.seasons, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  public tvShow!: TVShow;

  @OneToMany((_type) => TVEpisode, (episode) => episode.season)
  public episodes!: TVEpisode[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  public get title() {
    const seasonNb = formatNumber(this.seasonNumber);
    return this.tvShow?.title
      ? `${this.tvShow.title} - Season ${seasonNb}`
      : `Season ${seasonNb}`;
  }
}
