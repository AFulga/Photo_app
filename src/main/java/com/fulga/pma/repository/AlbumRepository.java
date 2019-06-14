package com.fulga.pma.repository;

import com.fulga.pma.entity.Album;

import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface AlbumRepository extends CrudRepository<Album, Long> {
    Album findById(long id);

    Album deleteById(long id);

    Iterable<Album> findByName(String name);

    Iterable<Album> findByUserId(long albumId);
}