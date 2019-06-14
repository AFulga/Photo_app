package com.fulga.pma.repository;

import java.util.List;

import com.fulga.pma.entity.Photo;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepository extends PagingAndSortingRepository<Photo, Long> {
    List<Photo> findByAlbumId(long albumId);
}