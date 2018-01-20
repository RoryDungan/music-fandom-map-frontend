import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { IArtistInfo } from '../../models/IArtistInfo';
import { IArtistStats } from '../../models/IArtistStats';
import { ArtistsService } from '../artists.service';

class ArtistsServiceStub {
    public async getAllArtists(): Promise<IArtistInfo[]> {
        return [];
    }

    public async getArtistStats(artistId: string): Promise<IArtistStats[]> {
        return [];
    }
}

describe('MapComponent', () => {
    let component: MapComponent;
    let fixture: ComponentFixture<MapComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ MapComponent ],
            providers: [
                { provide: ArtistsService, useClass: ArtistsServiceStub }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
