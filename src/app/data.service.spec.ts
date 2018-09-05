import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; //Eklendi

import { DataService } from './data.service';
import { post } from '../../node_modules/@types/selenium-webdriver/http';
import { Sorular } from './models/Sorular';
import { SoruModel } from './soruekle/soruModel';

describe('DataService', () => {



  let service: DataService;  //Eklendi
  let httpMock: HttpTestingController;//Eklendi
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], //Eklendi
      providers: [DataService]
    });

    service = TestBed.get(DataService);  //Eklendi
    httpMock = TestBed.get(HttpTestingController);// eklendi
  });
  it('getSoru Test', () => {
    const dummyPosts: Sorular = { eklemekValue: "2018-08-02T11:09:16.523+0000", guncellemekValue: "2018-08-02T11:09:16.523+0000", id: 1000, title: "sdfsd", description: "sadfads" };

    const id = 1000;
    service.getSoru(id).subscribe((data: Sorular) => {
      
      expect(data.title).toEqual('sdfsd');
    });
    const request = httpMock.expectOne(service.baseUrl + 'sorular/' + id);
    request.flush(dummyPosts);
    expect(request.request.method).toBe('GET');
    httpMock.verify();

  });


  it('getSorular Test', () => {
    const dummyPosts: Sorular[] = [
      { eklemekValue: "2018-08-02T11:09:16.523+0000", guncellemekValue: "2018-08-02T11:09:16.523+0000", id: 1000, title: "sdfsd", description: "sadfads" },
      { eklemekValue: "2018-08-02T11:09:32.331+0000", guncellemekValue: "2018-08-02T11:09:32.331+0000", id: 1002, title: "gfdsf", description: "dfsgsdf" },
      { eklemekValue: "2018-08-02T11:09:25.178+0000", guncellemekValue: "2018-08-02T11:09:40.845+0000", id: 1001, title: "veya", description: "aaa" },

    ];


    service.getSorular().subscribe(gelenVeri => {
    
      expect(gelenVeri.length).toBe(3);
      expect(gelenVeri).toEqual(dummyPosts);

    });

    const request = httpMock.expectOne(service.baseUrl + 'sorular');
    expect(request.request.method).toBe('GET');


    request.flush(dummyPosts);
    httpMock.verify();

  });

  it('deleteSoru test',()=>{

   
      const silinenData:Sorular={eklemekValue: "2018-08-02T11:09:25.178+0000", guncellemekValue: "2018-08-02T11:09:40.845+0000", id: 1000, title: "veya", description: "aaa"};

      const id=1001;
      service.deleteSoru(id).subscribe((data:Sorular)=>{
        console.log('girdi' + data.title);
          expect(data).toEqual(silinenData);
      });

      const req = httpMock.expectOne(service.baseUrl + 'sorular/' + id);
      expect(req.request.method).toBe('DELETE');
     
      httpMock.verify();
  });

  it('SoruGuncelle testi', () => {
   
    const id=1001;
    const guncelData:SoruModel={title: "veya", description: "aaa"};
    service.soruGuncelle(guncelData,id).subscribe((data: SoruModel) => {
            expect(data.title).toBe(guncelData.title);
        });

    const req = httpMock.expectOne(service.baseUrl + 'sorular/' + id);
    expect(req.request.method).toBe('PUT');

    req.flush(guncelData);

    httpMock.verify();
});

});