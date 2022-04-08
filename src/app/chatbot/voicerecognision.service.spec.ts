import { TestBed } from '@angular/core/testing';

import { VoicerecognisionService } from './voicerecognision.service';

describe('VoicerecognisionService', () => {
  let service: VoicerecognisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoicerecognisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
